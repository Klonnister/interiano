import {
  BadRequestException,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { ProductsService } from '../products.service';

@Injectable()
export class ExistentProductPipe implements PipeTransform {
  constructor(private readonly productsService: ProductsService) {}

  async transform(rawId: string) {
    const id = Number(rawId);
    if (isNaN(id))
      throw new BadRequestException('La búsqueda de producto debe ser por ID.');

    const product = await this.productsService.getProductById(id);
    if (!product) throw new NotFoundException('Este producto no existe.');

    return id;
  }
}
