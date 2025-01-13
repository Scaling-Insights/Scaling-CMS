import { Module } from '@nestjs/common';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { SnowflakeModule } from 'src/modules/snowflake/snowflake.module';
import { Content } from 'src/shared/entities/content.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ShortModule } from 'src/modules/short/short.module';
import { TagModule } from 'src/modules/tag/tag.module';
import { ContentTagModule } from 'src/modules/content-tag/content-tag.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { StreamService } from '../cloudflare/stream/stream.service';
import { R2Service } from '../cloudflare/r2/r2.service';
import { MockContentRepository } from './mocks/content.repository.mock';

@Module({
  imports: [
    SnowflakeModule,
    ShortModule,
    TagModule,
    ContentTagModule,
    AuthModule,
    JwtModule,
  ],
  controllers: [ContentController],
  providers: [
    ContentService,
    StreamService,
    R2Service,
    MockContentRepository,
    {
      provide: 'ContentRepository',
      useClass: MockContentRepository,
    },
  ],
  exports: [ContentService],
})
export class ContentModule {}
