import { Module, forwardRef } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TrademarksModule } from 'src/trademarks/trademarks.module';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => TrademarksModule),
    forwardRef(() => CategoriesModule),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
