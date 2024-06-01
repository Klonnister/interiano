import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ProductStockPipe implements PipeTransform {
  transform(stock: string) {
    if (!stock) return undefined;
    else if (stock === 'hideNoStock') return { gte: 1 };
    else if (stock === 'onlyNoStock') return 0;
    else
      throw new BadRequestException('Error al aplicar filtro de existencias');
  }
}
