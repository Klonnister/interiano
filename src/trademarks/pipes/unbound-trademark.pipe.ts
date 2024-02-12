import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { TrademarksService } from '../trademarks.service';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class UnboundTrademarkPipe implements PipeTransform {
  constructor(
    private readonly trademarksService: TrademarksService,
    private readonly productsService: ProductsService,
  ) {}

  async transform(rawId: string) {
    const id = Number(rawId);
    if (isNaN(id))
      throw new BadRequestException('La búsqueda de marca debe ser por ID.');

    const trademark = await this.trademarksService.getTrademarkById(id);
    if (!trademark) throw new NotFoundException('Esta marca no existe.');

    const products = await this.productsService.getProductsByTrademark(id);
    if (products.length)
      throw new ConflictException(
        'No se puede eliminar una marca cuando un producto está asociado a esta.',
      );

    return id;
  }
}
