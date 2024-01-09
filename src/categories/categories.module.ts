import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductsService } from 'src/products/products.service';

@Module({
  imports: [PrismaModule],
  providers: [CategoriesService, ProductsService],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
