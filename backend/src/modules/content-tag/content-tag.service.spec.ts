import { Test, TestingModule } from '@nestjs/testing';
import { ContentTagService } from './content-tag.service';

describe('ContentTagService', () => {
  let service: ContentTagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentTagService],
    }).compile();

    service = module.get<ContentTagService>(ContentTagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
