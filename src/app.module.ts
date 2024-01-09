import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { TrademarksModule } from './trademarks/trademarks.module';

@Module({
  imports: [ProductsModule, CategoriesModule, TrademarksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
