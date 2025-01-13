import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentTag } from 'src/shared/entities/content-tag.entity';
import { Tag } from 'src/shared/entities/tag.entity';
import { IContentTagService } from './content-tag.service.interface';

@Injectable()
export class ContentTagService implements IContentTagService {
  constructor(
    @InjectRepository(ContentTag)
    private readonly contentTagRepository: Repository<ContentTag>,
  ) {}

  async createContentTag(contentID: BigInt, tagName: string): Promise<ContentTag> {
    const contentTag = new ContentTag();
    contentTag.contentID = contentID;
    contentTag.tagName = tagName;
    return this.contentTagRepository.save(contentTag);
  }

  async findTagsByContentId(contentId: BigInt): Promise<Tag[]> {
    const contentTags = await this.contentTagRepository.find({ where: { contentID: contentId }, relations: ['tag'] });
    return contentTags.map(contentTag => contentTag.tag);
  }
}