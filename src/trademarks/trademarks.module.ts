import { Module } from '@nestjs/common';
import { TrademarksService } from './trademarks.service';
import { TrademarksController } from './trademarks.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaService],
  providers: [TrademarksService],
  controllers: [TrademarksController],
})
export class TrademarksModule {}
