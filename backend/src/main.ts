import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';
import { AppModule } from './modules/app/app.module';
import { AppDataSource } from './database/data-source';
import { ConfigService } from '@nestjs/config';

import './database';

const configService = new ConfigService();
async function bootstrap() {
  try {
    await AppDataSource.initialize();
    //console.log('Database Initialized');
    const app = await NestFactory.create(AppModule);
    const corsOrigins = JSON.parse(
      configService.get<string>('CORS_ALLOWED_ORIGINS'),
    );
    //console.log('CORS_ALLOWED_ORIGINS', corsOrigins);
    app.enableCors({
      origin: corsOrigins,
      methods: 'GET, POST, PUT, DELETE',
      allowedHeaders: 'Content-Type, Authorization',
      credentials: true,
    });
    await app.listen(3000);
    //console.log('Application is running on http://localhost:3000');
  } catch (error) {
    console.error('Database Initialization Error: ', error);
    process.exit(1);
  }
}

bootstrap();
