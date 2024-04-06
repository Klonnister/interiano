import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { CategoriesService } from '../categories.service';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class DeletableCategoryPipe implements PipeTransform {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly productsService: ProductsService,
  ) {}

  async transform(rawId: string) {
    const id = Number(rawId);
    if (isNaN(id))
      throw new BadRequestException(
        'La búsqueda de categoría debe ser por ID.',
      );

    const category = await this.categoriesService.getCategoryById(id);
    if (!category) throw new NotFoundException('Esta categoría no existe.');

    // Product constraint validation
    const products = await this.productsService.getProductsByCategory(id);
    if (products.length)
      throw new ConflictException(
        'No se puede eliminar una categoría cuando un producto está asociado a la misma.',
      );

    return id;
  }
}
