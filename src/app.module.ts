import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { TrademarksModule } from './trademarks/trademarks.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ProductsModule,
    CategoriesModule,
    TrademarksModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
