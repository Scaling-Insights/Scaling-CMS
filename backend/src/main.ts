import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';
import { AppModule } from './modules/app/app.module';
import { AppDataSource } from './database/data-source';
import { ConfigService } from '@nestjs/config';
import { seedDatabase } from './database/seed';

async function bootstrap() {
  try {
    // Initialize Data Source
    await AppDataSource.initialize();
    console.log('Database connected');

    // Run pending migrations
    console.log('Running migrations...');
    await AppDataSource.runMigrations();
    console.log('Migrations completed');

    // Seed default data
    console.log('Seeding database...');
    await seedDatabase();
    console.log('Database seeding completed');

    // Start the NestJS application
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const corsOrigins = JSON.parse(configService.get<string>('CORS_ALLOWED_ORIGINS'));
    app.enableCors({
      origin: corsOrigins,
      methods: 'GET, POST, PUT, DELETE',
      allowedHeaders: 'Content-Type, Authorization',
      credentials: true,
    });

    await app.listen(3000);
    console.log('Application is running on http://localhost:3000');
  } catch (error) {
    console.error('Error during application bootstrap:', error);
    process.exit(1);
  }
}

bootstrap();
