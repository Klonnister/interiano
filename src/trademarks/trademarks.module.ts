import { Module } from '@nestjs/common';
import { TrademarksService } from './trademarks.service';
import { TrademarksController } from './trademarks.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductsService } from 'src/products/products.service';

@Module({
  imports: [PrismaModule],
  providers: [TrademarksService, ProductsService],
  controllers: [TrademarksController],
})
export class TrademarksModule {}
