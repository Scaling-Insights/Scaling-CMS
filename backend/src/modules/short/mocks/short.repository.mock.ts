import { Short } from 'src/shared/entities/short.entity';

export class MockShortRepository {
  private shorts: Short[] = [
    {
      id: 1n,
      videoLength: 30,
      streamUID: 'stream1',
      description: 'First short video',
      thumbnailLink: 'thumbnail1.jpg',
      createdAt: new Date('2024-12-06T13:05:58.038Z'),
      updatedAt: new Date('2024-12-06T13:05:58.038Z'),
    },
    {
      id: 2n,
      videoLength: 45,
      streamUID: 'stream2',
      description: 'Second short video',
      thumbnailLink: 'thumbnail2.jpg',
      createdAt: new Date('2024-12-06T13:05:58.038Z'),
      updatedAt: new Date('2024-12-06T13:05:58.038Z'),
    },
    {
      id: 3n,
      videoLength: 60,
      streamUID: 'stream3',
      description: 'Third short video',
      thumbnailLink: 'thumbnail3.jpg',
      createdAt: new Date('2024-12-06T13:05:58.038Z'),
      updatedAt: new Date('2024-12-06T13:05:58.038Z'),
    },
    {
      id: 4n,
      videoLength: 90,
      streamUID: 'stream4',
      description: 'Fourth short video',
      thumbnailLink: 'thumbnail4.jpg',
      createdAt: new Date('2024-12-06T13:05:58.038Z'),
      updatedAt: new Date('2024-12-06T13:05:58.038Z'),
    },
    {
      id: 5n,
      videoLength: 120,
      streamUID: 'stream5',
      description: 'Fifth short video',
      thumbnailLink: 'thumbnail5.jpg',
      createdAt: new Date('2024-12-06T13:05:58.038Z'),
      updatedAt: new Date('2024-12-06T13:05:58.038Z'),
    },
    {
      id: 6n,
      videoLength: 150,
      streamUID: 'stream6',
      description: 'Sixth short video',
      thumbnailLink: 'thumbnail6.jpg',
      createdAt: new Date('2024-12-06T13:05:58.038Z'),
      updatedAt: new Date('2024-12-06T13:05:58.038Z'),
    },
    {
      id: 7n,
      videoLength: 180,
      streamUID: 'stream7',
      description: 'Seventh short video',
      thumbnailLink: 'thumbnail7.jpg',
      createdAt: new Date('2024-12-06T13:05:58.038Z'),
      updatedAt: new Date('2024-12-06T13:05:58.038Z'),
    },
    {
      id: 8n,
      videoLength: 210,
      streamUID: 'stream8',
      description: 'Eighth short video',
      thumbnailLink: 'thumbnail8.jpg',
      createdAt: new Date('2024-12-06T13:05:58.038Z'),
      updatedAt: new Date('2024-12-06T13:05:58.038Z'),
    },
    {
      id: 9n,
      videoLength: 240,
      streamUID: 'stream9',
      description: 'Ninth short video',
      thumbnailLink: 'thumbnail9.jpg',
      createdAt: new Date('2024-12-06T13:05:58.038Z'),
      updatedAt: new Date('2024-12-06T13:05:58.038Z'),
    },
    {
      id: 10n,
      videoLength: 300,
      streamUID: 'stream10',
      description: 'Tenth short video',
      thumbnailLink: 'thumbnail10.jpg',
      createdAt: new Date('2024-12-06T13:05:58.038Z'),
      updatedAt: new Date('2024-12-06T13:05:58.038Z'),
    },

  ];

  async findOne({ where: { id } }): Promise<Short> {
    return this.shorts.find((short) => short.id === id);
  }

  async save(short: Short): Promise<Short> {
    // this.shorts.push(short);
    return short;
  }
}
