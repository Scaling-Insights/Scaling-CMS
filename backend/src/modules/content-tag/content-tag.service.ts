import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentTag } from 'src/shared/entities/content-tag.entity';
import { Tag } from 'src/shared/entities/tag.entity';
import { MockContentTagRepository } from './mocks/content-tag.repository.mock';

@Injectable()
export class ContentTagService {
  constructor(
    @Inject('ContentTagRepository')
    private contentTagRepository: MockContentTagRepository,
  ) {}

  async createContentTag(
    contentID: BigInt,
    tagName: string,
  ): Promise<ContentTag> {
    const contentTag = new ContentTag();
    contentTag.contentID = contentID;
    contentTag.tagName = tagName;
    return this.contentTagRepository.save(contentTag);
  }

  async findTagsByContentId(contentId: BigInt): Promise<Tag[]> {
    const contentTags = await this.contentTagRepository.find({
      where: { contentID: contentId },
      relations: ['tag'],
    });
    return contentTags.map((contentTag) => contentTag.tag);
  }
}
