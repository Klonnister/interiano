import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ProductOrderByPipe implements PipeTransform {
  transform(order: string) {
    if (!order) return { created_at: 'desc' };

    const orderArr: string[] = order.split(',');
    if (orderArr.length <= 1)
      throw new BadRequestException('Error al ordenar los productos.');

    const [orderBy, orderType] = orderArr;

    if (orderType !== 'asc' && orderType !== 'desc')
      throw new BadRequestException('Error al ordenar los productos.');

    switch (orderBy) {
      case 'name':
        return { name: orderType };
      case 'trademark':
        return { trademark: { name: orderType } };
      case 'category':
        return { category: { name: orderType } };
      case 'price':
        return { applied_price: orderType };
      case 'created_at':
        return { created_at: orderType };
      case 'updated_at':
        return { updated_at: orderType };
      default:
        throw new BadRequestException('Error al ordenar los productos.');
    }
  }
}
