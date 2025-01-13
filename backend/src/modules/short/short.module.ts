import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortService } from './short.service';
import { SnowflakeModule } from 'src/modules/snowflake/snowflake.module';
import { Short } from 'src/shared/entities/short.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Short]),
    SnowflakeModule,
  ],
  providers: [
    ShortService, 
  ],
  exports: [ShortService],
})
export class ShortModule {}