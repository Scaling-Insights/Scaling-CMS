import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentTagService } from './content-tag.service';
import { ContentTag } from 'src/shared/entities/content-tag.entity';
import { MockContentTagRepository } from './mocks/content-tag.repository.mock';
@Module({
  providers: [
    ContentTagService,
    MockContentTagRepository,
    {
      provide: 'ContentTagRepository',
      useClass: MockContentTagRepository,
    },
  ],
  exports: [ContentTagService],
})
export class ContentTagModule {}
