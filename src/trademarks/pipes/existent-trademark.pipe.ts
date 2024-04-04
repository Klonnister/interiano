import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { TrademarksService } from '../trademarks.service';
import { TrademarkDTO } from '../dto/trademark.dto';

@Injectable()
export class ExistentTrademarkPipe implements PipeTransform {
  constructor(private readonly trademarksService: TrademarksService) {}

  async transform(data: TrademarkDTO) {
    const { name } = data;

    const existentTrademark =
      await this.trademarksService.getTrademarkByName(name);

    if (existentTrademark) {
      throw new BadRequestException('Esta marca ya existe');
    }

    return data;
  }
}
