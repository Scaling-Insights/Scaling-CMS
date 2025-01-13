import { Inject, Injectable } from '@nestjs/common';
import { UploadContentDto } from 'src/modules/content/dto/upload-content.dto';
import { InvalidContentTypeException } from 'src/common/exceptions/content/invalid-content-type.exception';
import { InvalidPublicationStatusException } from 'src/common/exceptions/content/invalid-publication-status.exception';
import { MissingFieldException } from 'src/common/exceptions/missing-field.exception';
import { ContentType } from 'src/shared/enums/content-type.enum';
import { PublicationStatus } from 'src/shared/enums/publication-status.enum';
import { Content } from 'src/shared/entities/content.entity';
import { SnowflakeService } from 'src/modules/snowflake/snowflake.service';
import { ShortService } from 'src/modules/short/short.service';
import { TagService } from 'src/modules/tag/tag.service';
import { ContentTagService } from 'src/modules/content-tag/content-tag.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentDto } from 'src/modules/content/dto/content.dto';
import { GetAllContentDto } from 'src/modules/content/dto/get-all-content.dto';
import { R2Service } from '../cloudflare/r2/r2.service';
import { ConfigService } from '@nestjs/config';
import { IContentService } from './content.service.interface';


@Injectable()
export class ContentService implements IContentService {
  constructor(
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
    private readonly snowflakeService: SnowflakeService,
    private readonly shortService: ShortService,
    private readonly tagService: TagService,
    private readonly contentTagService: ContentTagService,
    private readonly r2Service: R2Service,
    private readonly configService: ConfigService,
  ) { }

  private readonly bucketName = this.configService.get<string>('R2_BUCKET_NAME');
  private readonly linkExpiresIn = this.configService.get<number>('CLOUDFLARE_EXPIRES_IN');


  validateContent(uploadContentDto: UploadContentDto): void {
    const requiredFields = [
      'streamUID',
      'title',
      'tags',
      'publicationStatus',
      'type',
    ];

    for (const field of requiredFields) {
      if (!uploadContentDto[field]) {
        throw new MissingFieldException(field);
      }
    }

    if (!Object.values(ContentType).includes(uploadContentDto.type)) {
      throw new InvalidContentTypeException();
    }

    if (
      !Object.values(PublicationStatus).includes(
        uploadContentDto.publicationStatus,
      )
    ) {
      throw new InvalidPublicationStatusException();
    }
  }

  async getAllContent(
    userId: BigInt,
    rangeMin: number,
    rangeMax: number
  ): Promise<GetAllContentDto> {
    const rangeSize = rangeMax - rangeMin + 1;

    // Fetch contents with pagination
    const contents = await this.contentRepository.find({
      where: { userID: userId },
      order: { createdAt: 'DESC' },
      take: rangeSize,
      skip: rangeMin,
    });

    //Convert contents to DTOs
    const contentDtos: ContentDto[] = await Promise.all(
      contents.map(async (content) => {
        let description = '';
        let thumbnailLink = '';
        let streamUID = '';
        let videoLength = 0;

        switch (content.type) {
          case ContentType.SHORT:
            const short = await this.shortService.findShortById(
              content.contentItemID,
            );
            if (short) {
              description = short.description || '';
              thumbnailLink = await this.r2Service.generatePresignedDownloadUrl(
                this.bucketName,
                short.thumbnailLink,
                this.linkExpiresIn
              ) || '';
              streamUID = short.streamUID || '';
              videoLength = short.videoLength || 0;
            } else {
              console.error(`Short with ID ${content.contentItemID} not found`);
            }
            break;
          default:
            throw new InvalidContentTypeException();
        }

        const tags = await this.contentTagService.findTagsByContentId(
          content.id,
        );

        return {
          description,
          thumbnailLink,
          streamUID,
          videoLength,
          title: content.title,
          tags: tags.map((tag) => tag.tagName),
          publicationStatus: content.publicationStatus,
          type: content.type,
          createdAt: content.createdAt,
        } as ContentDto;
      }),
    );
    return { contents: contentDtos }
  }

  async getRangeSize(): Promise<number> {
    return await this.contentRepository.count();
  }

  async uploadContent(
    uploadContentDto: UploadContentDto,
    userId: BigInt,
  ): Promise<void> {
    this.validateContent(uploadContentDto);

    let contentItemID: BigInt;

    switch (uploadContentDto.type) {
      case ContentType.SHORT:
        contentItemID = await this.createShortContent(uploadContentDto);
        break;

      default:
        throw new InvalidContentTypeException();
    }

    const content = new Content();
    content.id = this.snowflakeService.generateId();
    content.userID = userId;
    content.title = uploadContentDto.title;
    content.publicationStatus = uploadContentDto.publicationStatus;
    content.type = uploadContentDto.type;
    content.contentItemID = contentItemID;

    console.log('Saving content for user', userId);

    await this.contentRepository.save(content);

    console.log('Saved content for user', userId);
    console.log('Saving tags for user', userId);

    await this.handleTags(content.id, uploadContentDto.tags);

    console.log('Saved tags for user', userId);
  }

  private async handleTags(contentId: BigInt, tags: string[]): Promise<void> {
    for (const tagName of tags) {
      let tag = await this.tagService.findTagByName(tagName);
      if (!tag) {
        tag = await this.tagService.createTag(tagName);
      }
      await this.contentTagService.createContentTag(contentId, tag.tagName);
    }
  }

  private async createShortContent(
    uploadContentDto: UploadContentDto,
  ): Promise<BigInt> {
    const short = this.shortService.createShort(
      uploadContentDto.videoLength,
      uploadContentDto.streamUID,
      uploadContentDto.description,
      uploadContentDto.thumbnailLink,
    );
    const savedShort = await this.shortService.uploadShort(short);
    return savedShort.id;
  }
}