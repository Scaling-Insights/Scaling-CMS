import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentTagService } from './content-tag.service';
import { ContentTag } from 'src/shared/entities/content-tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContentTag])],
  providers: [ContentTagService],
  exports: [ContentTagService],
})
export class ContentTagModule {}