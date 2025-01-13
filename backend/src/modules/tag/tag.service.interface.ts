import { Tag } from "src/shared/entities/tag.entity";

export interface ITagService {
    createTag(tagName: string): Promise<Tag>;
    findTagByName(tagName: string): Promise<Tag>;
}