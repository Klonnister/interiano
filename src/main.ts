import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { existsSync } from 'fs';
import { mkdir } from 'fs/promises';

async function bootstrap() {
  if (!existsSync('./public')) {
    await mkdir('./public');
    await mkdir('./public/profile-imgs/');
    await mkdir('./public/trademark-imgs');
    await mkdir('./public/product-imgs');
    await mkdir('./public/guest-imgs');
  }

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
