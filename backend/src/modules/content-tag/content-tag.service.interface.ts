import { ContentTag } from 'src/shared/entities/content-tag.entity';
import { Tag } from 'src/shared/entities/tag.entity';

export interface IContentTagService {
  createContentTag(contentID: BigInt, tagName: string): Promise<ContentTag>;
  findTagsByContentId(contentId: BigInt): Promise<Tag[]>;
}