import { ContentTag } from 'src/shared/entities/content-tag.entity';
import { Content } from 'src/shared/entities/content.entity';
import { Tag } from 'src/shared/entities/tag.entity';

export class MockContentTagRepository {
  private contentTags: ContentTag[] = [
    {
      contentID: 1n,
      tagName: 'Tag1',
      content: {
        id: 1n,
        userID: 7265738540758077449n,
        title: 'First Content',
        publicationStatus: 'public',
        type: 'short',
        contentItemID: 1n,
        createdAt: new Date('2024-12-06T13:05:58.038Z'),
        updatedAt: new Date('2024-12-06T13:05:58.038Z'),
        deletedAt: null,
      } as Content,
      tag: {
        tagName: 'Tag1',
        createdAt: new Date('2024-12-06T13:05:58.038Z'),
      } as Tag,
    },
    {
      contentID: 2n,
      tagName: 'Tag2',
      content: {
        id: 2n,
        userID: 7265738540758077449n,
        title: 'Second Content',
        publicationStatus: 'private',
        type: 'short',
        contentItemID: 2n,
        createdAt: new Date('2024-12-06T13:05:58.038Z'),
        updatedAt: new Date('2024-12-06T13:05:58.038Z'),
        deletedAt: null,
      } as Content,
      tag: {
        tagName: 'Tag2',
        createdAt: new Date('2024-12-06T13:05:58.038Z'),
      } as Tag,
    },
    {
      contentID: 3n,
      tagName: 'Tag3',
      content: {
        id: 3n,
        userID: 7265738540758077449n,
        title: 'Third Content',
        publicationStatus: 'private',
        type: 'short',
        contentItemID: 3n,
        createdAt: new Date('2024-12-06T13:05:58.038Z'),
        updatedAt: new Date('2024-12-06T13:05:58.038Z'),
        deletedAt: null,
      } as Content,
      tag: {
        tagName: 'Tag3',
        createdAt: new Date('2024-12-06T13:05:58.038Z'),
      } as Tag,
    },
    {
      contentID: 4n,
      tagName: 'Tag4',
      content: {
        id: 4n,
        userID: 7265738540758077449n,
        title: 'Fourth Content',
        publicationStatus: 'private',
        type: 'short',
        contentItemID: 4n,
        createdAt: new Date('2024-12-06T13:05:58.038Z'),
        updatedAt: new Date('2024-12-06T13:05:58.038Z'),
        deletedAt: null,
      } as Content,
      tag: {
        tagName: 'Tag4',
        createdAt: new Date('2024-12-06T13:05:58.038Z'),
      } as Tag,
    },
    {
      contentID: 5n,
      tagName: 'Tag5',
      content: {
        id: 5n,
        userID: 7265738540758077449n,
        title: 'Fifth Content',
        publicationStatus: 'private',
        type: 'short',
        contentItemID: 5n,
        createdAt: new Date('2024-12-06T13:05:58.038Z'),
        updatedAt: new Date('2024-12-06T13:05:58.038Z'),
        deletedAt: null,
      } as Content,
      tag: {
        tagName: 'Tag5',
        createdAt: new Date('2024-12-06T13:05:58.038Z'),
      } as Tag,
    },
    {
      contentID: 6n,
      tagName: 'Tag6',
      content: {
        id: 6n,
        userID: 7265738540758077449n,
        title: 'Sixth Content',
        publicationStatus: 'private',
        type: 'short',
        contentItemID: 6n,
        createdAt: new Date('2024-12-06T13:05:58.038Z'),
        updatedAt: new Date('2024-12-06T13:05:58.038Z'),
        deletedAt: null,
      } as Content,
      tag: {
        tagName: 'Tag6',
        createdAt: new Date('2024-12-06T13:05:58.038Z'),
      } as Tag,
    },
    {
      contentID: 7n,
      tagName: 'Tag7',
      content: {
        id: 7n,
        userID: 7265738540758077449n,
        title: 'Seventh Content',
        publicationStatus: 'private',
        type: 'short',
        contentItemID: 7n,
        createdAt: new Date('2024-12-06T13:05:58.038Z'),
        updatedAt: new Date('2024-12-06T13:05:58.038Z'),
        deletedAt: null,
      } as Content,
      tag: {
        tagName: 'Tag7',
        createdAt: new Date('2024-12-06T13:05:58.038Z'),
      } as Tag,
    },
    {
      contentID: 8n,
      tagName: 'Tag8',
      content: {
        id: 8n,
        userID: 7265738540758077449n,
        title: 'Eigth Content',
        publicationStatus: 'private',
        type: 'short',
        contentItemID: 8n,
        createdAt: new Date('2024-12-06T13:05:58.038Z'),
        updatedAt: new Date('2024-12-06T13:05:58.038Z'),
        deletedAt: null,
      } as Content,
      tag: {
        tagName: 'Tag8',
        createdAt: new Date('2024-12-06T13:05:58.038Z'),
      } as Tag,
    },
    {
      contentID: 9n,
      tagName: 'Tag9',
      content: {
        id: 9n,
        userID: 7265738540758077449n,
        title: 'Ninth Content',
        publicationStatus: 'private',
        type: 'short',
        contentItemID: 9n,
        createdAt: new Date('2024-12-06T13:05:58.038Z'),
        updatedAt: new Date('2024-12-06T13:05:58.038Z'),
        deletedAt: null,
      } as Content,
      tag: {
        tagName: 'Tag9',
        createdAt: new Date('2024-12-06T13:05:58.038Z'),
      } as Tag,
    },
    {
      contentID: 10n,
      tagName: 'Tag10',
      content: {
        id: 10n,
        userID: 7265738540758077449n,
        title: 'Tenth Content',
        publicationStatus: 'private',
        type: 'short',
        contentItemID: 10n,
        createdAt: new Date('2024-12-06T13:05:58.038Z'),
        updatedAt: new Date('2024-12-06T13:05:58.038Z'),
        deletedAt: null,
      } as Content,
      tag: {
        tagName: 'Tag10',
        createdAt: new Date('2024-12-06T13:05:58.038Z'),
      } as Tag,
    },
  ];

  async find({ where: { contentID }, relations }): Promise<ContentTag[]> {
    return this.contentTags.filter(
      (contentTag) => contentTag.contentID === contentID,
    );
  }

  async save(contentTag: ContentTag): Promise<ContentTag> {
    // this.contentTags.push(contentTag);
    return contentTag;
  }
}
