import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CategoriesService } from 'src/categories/categories.service';
import { TrademarksService } from 'src/trademarks/trademarks.service';

@Module({
  imports: [PrismaModule],
  controllers: [ProductsController],
  providers: [ProductsService, CategoriesService, TrademarksService],
})
export class ProductsModule {}
