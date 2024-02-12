import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TrademarksService } from './trademarks.service';
import { updateTrademarkDTO } from './dto/trademark.dto';
import { Trademark } from '@prisma/client';
import { Public } from 'src/auth/decorators/public.decorator';
import { ExistentTrademarkPipe } from './pipes/existent-trademark.pipe';
import { UnboundTrademarkPipe } from './pipes/unbound-trademark.pipe';

@Controller('trademarks')
export class TrademarksController {
  constructor(private trademarksService: TrademarksService) {}

  @Get()
  @Public()
  getTrademarks(@Query('name') name: string): Promise<Trademark[]> {
    return this.trademarksService.getTrademarks(name);
  }

  @Get(':id')
  @Public()
  async getTrademarkById(
    @Param('id', ExistentTrademarkPipe) id: number,
  ): Promise<Trademark> {
    return await this.trademarksService.getTrademarkById(id);
  }

  @Post()
  createTrademark(@Body() data: Trademark): Promise<Trademark> {
    return this.trademarksService.createTrademark(data);
  }

  @Patch(':id')
  async updateTrademark(
    @Param('id', ExistentTrademarkPipe) id: number,
    @Body() data: updateTrademarkDTO,
  ): Promise<Trademark> {
    return await this.trademarksService.updateTrademark(id, data);
  }

  @Delete(':id')
  async deleteTrademark(
    @Param('id', UnboundTrademarkPipe) id: number,
  ): Promise<Trademark> {
    return await this.trademarksService.deleteTrademark(id);
  }
}
