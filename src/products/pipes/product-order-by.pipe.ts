import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ProductOrderByPipe implements PipeTransform {
  transform(order: string) {
    if (!order) return { price: 'asc' };

    const orderArr: string[] = order.split(',');
    if (orderArr.length <= 1)
      throw new BadRequestException('Error al ordenar los productos.');

    const [orderBy, orderType] = orderArr;

    if (orderType !== 'asc' && orderType !== 'desc')
      throw new BadRequestException('Error al ordenar los productos.');

    switch (orderBy) {
      case 'name':
        return { title: orderType };
      case 'trademark':
        return { trademark: { name: orderType } };
      case 'category':
        return { category: { name: orderType } };
      case 'price':
        return { price: orderType };
      default:
        throw new BadRequestException('Error al ordenar los productos.');
    }
  }
}
