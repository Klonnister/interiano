import { Module } from '@nestjs/common';
import { TrademarksService } from './trademarks.service';
import { TrademarksController } from './trademarks.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [TrademarksService],
  controllers: [TrademarksController],
})
export class TrademarksModule {}
