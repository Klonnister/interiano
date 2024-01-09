import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { TrademarksService } from './trademarks.service';

@Controller('trademarks')
export class TrademarksController {
  constructor(private trademarksService: TrademarksService) {}

  @Get()
  getTrademarks(@Query('name') name: string) {
    return this.trademarksService.getTrademarks(name);
  }

  @Get(':id')
  async getTrademarkById(@Param('id') rawId: number) {
    const id = Number(rawId);
    if (isNaN(id)) {
      throw new BadRequestException('Id must be a number');
    }

    const trademark = await this.trademarksService.getTrademarkById(id);
    if (!trademark) throw new NotFoundException('Trademark does not exist');
    return trademark;
  }
}
