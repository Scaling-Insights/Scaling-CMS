import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortService } from './short.service';
import { SnowflakeModule } from 'src/modules/snowflake/snowflake.module';
import { Short } from 'src/shared/entities/short.entity';
import { MockShortRepository } from './mocks/short.repository.mock';

@Module({
  imports: [SnowflakeModule],
  providers: [
    ShortService,
    MockShortRepository,
    {
      provide: 'ShortRepository',
      useClass: MockShortRepository,
    },
  ],
  exports: [ShortService],
})
export class ShortModule {}
