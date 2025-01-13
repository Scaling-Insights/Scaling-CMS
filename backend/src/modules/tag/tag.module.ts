import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagService } from './tag.service';
import { Tag } from 'src/shared/entities/tag.entity';
import { MockTagRepository } from './mocks/tag.repository.mock';

@Module({
  providers: [
    TagService,
    MockTagRepository,
    {
      provide: 'TagRepository',
      useClass: MockTagRepository,
    },
  ],
  exports: [TagService],
})
export class TagModule {}
