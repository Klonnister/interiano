import {
  BadRequestException,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { TrademarksService } from '../trademarks.service';

@Injectable()
export class ValidTrademarkPipe implements PipeTransform {
  constructor(private readonly trademarksService: TrademarksService) {}

  async transform(rawId: string) {
    const id = Number(rawId);
    if (isNaN(id))
      throw new BadRequestException('La búsqueda de marca debe ser por ID.');

    const trademark = await this.trademarksService.getTrademarkById(id);
    if (!trademark) throw new NotFoundException('Esta marca no existe.');

    return id;
  }
}
