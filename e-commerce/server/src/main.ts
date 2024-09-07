import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParse from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParse());
  app.enableCors({
    credentials: true,
    origin: 'http://localhost:8080',
  });

  const config = new DocumentBuilder()
    .setTitle('E-commerce')
    .setDescription('This is a exercise app')
    .setVersion('1.0')
    .addTag('store app')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
