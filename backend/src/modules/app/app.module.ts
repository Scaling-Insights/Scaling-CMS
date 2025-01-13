import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ContentModule } from 'src/modules/content/content.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/shared/entities/user.entity';
import { ShortModule } from 'src/modules/short/short.module';
import { TagModule } from 'src/modules/tag/tag.module';
import { ContentTagModule } from 'src/modules/content-tag/content-tag.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { AppDataSource } from 'src/database/data-source';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(AppDataSource.options),
    ContentModule,
    ShortModule,
    TagModule,
    ContentTagModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
