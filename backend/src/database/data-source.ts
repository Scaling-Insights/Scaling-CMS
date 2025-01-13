import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from 'src/shared/entities/user.entity';
import { Tag } from 'src/shared/entities/tag.entity';
import { Content } from 'src/shared/entities/content.entity';
import { ContentTag } from 'src/shared/entities/content-tag.entity';
import { Short } from 'src/shared/entities/short.entity';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  entities: [User, Tag, Content, ContentTag, Short],
  synchronize: true,
  logging: false,
});
