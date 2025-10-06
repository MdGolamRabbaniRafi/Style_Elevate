// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { SeedService } from './Seed/seed.service';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    });

    // Swagger Setup
    const config = new DocumentBuilder()
      .setTitle('Farseit API')
      .setDescription('API documentation for Farseit backend')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(7000);

    // Logger Logging Environment Variables
    Logger.log('------------------------------------------------------------');
    Logger.log('PG Database');
    Logger.log('------------------------------------------------------------');
    Logger.log(`Host: ${process.env.DATABASE_HOST}`);
    Logger.log(`Port: ${process.env.DATABASE_PORT}`);
    Logger.log(`User: ${process.env.DATABASE_USER}`);
    Logger.log(`Password: ${process.env.DATABASE_PASSWORD}`);
    Logger.log(`Database: ${process.env.DATABASE_NAME}`);
    Logger.log('------------------------------------------------------------');
    Logger.log('Email');
    Logger.log('------------------------------------------------------------');
    Logger.log(`Host: ${process.env.EMAIL_HOST}`);
    Logger.log(`From: ${process.env.EMAIL_FROM}`);
    Logger.log(`User: ${process.env.EMAIL_USER}`);
    Logger.log(`Pass: ${process.env.EMAIL_PASS}`);
    Logger.log(`Port: ${process.env.EMAIL_PORT}`);
    Logger.log('------------------------------------------------------------');
    if (process.env.SEED === 'true') {
      try {
        const seedService = app.get(SeedService);
        Logger.log('Running seed...');
        await seedService.runSeed();
        Logger.log('Seeding completed.');
        await app.close();
      } catch (error) {
        console.error('Error during seed:', error);
        Logger.error('Error during seed', error);
        await app.close();
      }
    }
  } catch (error) {
    console.error('Error during bootstrap:', error);
    Logger.error('Error during bootstrap', error);
    process.exit(1);
  }
}

bootstrap();
