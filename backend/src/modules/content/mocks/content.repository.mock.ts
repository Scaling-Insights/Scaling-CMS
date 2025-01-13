import { Content } from 'src/shared/entities/content.entity';
import { ContentType } from 'src/shared/enums/content-type.enum';
import { PublicationStatus } from 'src/shared/enums/publication-status.enum';

export class MockContentRepository {
  private contents: Content[] = [
    {
      id: 1n,
      userID: 7265738540758077449n,
      title: 'First Content',
      publicationStatus: PublicationStatus.PUBLIC,
      type: ContentType.SHORT,
      contentItemID: 1n,
      createdAt: new Date('2024-12-06T13:05:58.038Z'),
      updatedAt: new Date('2024-12-06T13:05:58.038Z'),
      deletedAt: null,
    },
    {
      id: 2n,
      userID: 7265738540758077449n,
      title: 'Second Content',
      publicationStatus: PublicationStatus.PRIVATE,
      type: ContentType.SHORT,
      contentItemID: 2n,
      createdAt: new Date('2024-12-06T13:05:58.038Z'),
      updatedAt: new Date('2024-12-06T13:05:58.038Z'),
      deletedAt: null,
    },
    {
      id: 3n,
      userID: 7265738540758077449n,
      title: 'Third Content',
      publicationStatus: PublicationStatus.PRIVATE,
      type: ContentType.SHORT,
      contentItemID: 3n,
      createdAt: new Date('2024-12-06T13:05:58.038Z'),
      updatedAt: new Date('2024-12-06T13:05:58.038Z'),
      deletedAt: null,
    },
    {
      id: 4n,
      userID: 7265738540758077449n,
      title: 'Fourth Content',
      publicationStatus: PublicationStatus.PUBLIC,
      type: ContentType.SHORT,
      contentItemID: 4n,
      createdAt: new Date('2024-12-06T13:05:58.038Z'),
      updatedAt: new Date('2024-12-06T13:05:58.038Z'),
      deletedAt: null,
    },
    {
      id: 5n,
      userID: 7265738540758077449n,
      title: 'Fifth Content',
      publicationStatus: PublicationStatus.PUBLIC,
      type: ContentType.SHORT,
      contentItemID: 5n,
      createdAt: new Date('2024-12-06T13:05:58.038Z'),
      updatedAt: new Date('2024-12-06T13:05:58.038Z'),
      deletedAt: null,
    },
    {
      id: 6n,
      userID: 7265738540758077449n,
      title: 'Sixth Content',
      publicationStatus: PublicationStatus.PRIVATE,
      type: ContentType.SHORT,
      contentItemID: 6n,
      createdAt: new Date('2024-12-06T13:05:58.038Z'),
      updatedAt: new Date('2024-12-06T13:05:58.038Z'),
      deletedAt: null,
    },
    {
      id: 7n,
      userID: 7265738540758077449n,
      title: 'Seventh Content',
      publicationStatus: PublicationStatus.PRIVATE,
      type: ContentType.SHORT,
      contentItemID: 7n,
      createdAt: new Date('2024-12-06T13:05:58.038Z'),
      updatedAt: new Date('2024-12-06T13:05:58.038Z'),
      deletedAt: null,
    },
    {
      id: 8n,
      userID: 7265738540758077449n,
      title: 'Eight Content',
      publicationStatus: PublicationStatus.PUBLIC,
      type: ContentType.SHORT,
      contentItemID: 8n,
      createdAt: new Date('2024-12-06T13:05:58.038Z'),
      updatedAt: new Date('2024-12-06T13:05:58.038Z'),
      deletedAt: null,
    },
    {
      id: 9n,
      userID: 7265738540758077449n,
      title: 'Ninth Content',
      publicationStatus: PublicationStatus.PUBLIC,
      type: ContentType.SHORT,
      contentItemID: 9n,
      createdAt: new Date('2024-12-06T13:05:58.038Z'),
      updatedAt: new Date('2024-12-06T13:05:58.038Z'),
      deletedAt: null,
    },
    {
      id: 10n,
      userID: 7265738540758077449n,
      title: 'Tenth Content',
      publicationStatus: PublicationStatus.PUBLIC,
      type: ContentType.SHORT,
      contentItemID: 10n,
      createdAt: new Date('2024-12-06T13:05:58.038Z'),
      updatedAt: new Date('2024-12-06T13:05:58.038Z'),
      deletedAt: null,
    },
  ];

  async find({ where: { userID }, order, take, skip }): Promise<Content[]> {
    return this.contents
      .filter((content) => content.userID === userID)
      .slice(skip, skip + take);
  }

  async count(): Promise<number> {
    return this.contents.length;
  }

  async save(content: Content): Promise<Content> {
    // this.contents.push(content);
    return content;
  }
}
