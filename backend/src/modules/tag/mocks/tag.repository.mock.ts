import { Tag } from 'src/shared/entities/tag.entity';

export class MockTagRepository {
  private tags: Tag[] = [
    {
      tagName: 'Tag1',
      createdAt: new Date('2024-12-06T13:05:58.038Z'),
    },
    {
      tagName: 'Tag2',
      createdAt: new Date('2024-12-06T13:05:58.038Z'),
    },
    {
      tagName: 'Tag3',
      createdAt: new Date('2024-12-06T13:05:58.038Z'),
    },
    {
      tagName: 'Tag4',
      createdAt: new Date('2024-12-06T13:05:58.038Z'),
    },
    {
      tagName: 'Tag5',
      createdAt: new Date('2024-12-06T13:05:58.038Z'),
    },
    {
      tagName: 'Tag6',
      createdAt: new Date('2024-12-06T13:05:58.038Z'),
    },
    {
      tagName: 'Tag7',
      createdAt: new Date('2024-12-06T13:05:58.038Z'),
    },
    {
      tagName: 'Tag8',
      createdAt: new Date('2024-12-06T13:05:58.038Z'),
    },
    {
      tagName: 'Tag9',
      createdAt: new Date('2024-12-06T13:05:58.038Z'),
    },
    {
      tagName: 'Tag10',
      createdAt: new Date('2024-12-06T13:05:58.038Z'),
    },
  ];

  async findOne({ where: { tagName } }): Promise<Tag> {
    return this.tags.find((tag) => tag.tagName === tagName);
  }

  async save(tag: Tag): Promise<Tag> {
    // this.tags.push(tag);
    return tag;
  }
}
