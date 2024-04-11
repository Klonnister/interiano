import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { TrademarksService } from '../trademarks.service';
import { TrademarkDTO } from '../dto/trademark.dto';
import { existsSync } from 'fs';

@Injectable()
export class ExistentTrademarkPipe implements PipeTransform {
  constructor(private readonly trademarksService: TrademarksService) {}

  async transform(data: TrademarkDTO) {
    const { name, image } = data;

    const existentTrademark =
      await this.trademarksService.getTrademarkByName(name);

    if (existentTrademark) {
      throw new BadRequestException('Esta marca ya existe');
    }

    if (image && !existsSync(`./public${image}`))
      throw new BadRequestException(
        'Error al guardar imagen, seleccione otra.',
      );

    return data;
  }
}
