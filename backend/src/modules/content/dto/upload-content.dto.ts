import { ContentType } from 'src/shared/enums/content-type.enum';
import { PublicationStatus } from 'src/shared/enums/publication-status.enum';

export class UploadContentDto {
    readonly description: string;
    readonly thumbnailLink: string;
    readonly streamUID: string;
    readonly videoLength: number;
    readonly title: string;
    readonly tags: string[];
    readonly publicationStatus: PublicationStatus;
    readonly type: ContentType;
}