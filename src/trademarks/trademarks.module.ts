import { Module, forwardRef } from '@nestjs/common';
import { TrademarksService } from './trademarks.service';
import { TrademarksController } from './trademarks.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [PrismaModule, forwardRef(() => ProductsModule)],
  providers: [TrademarksService],
  controllers: [TrademarksController],
  exports: [TrademarksService],
})
export class TrademarksModule {}
