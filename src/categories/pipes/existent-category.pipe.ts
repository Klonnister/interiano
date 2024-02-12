import {
  BadRequestException,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { CategoriesService } from '../categories.service';

@Injectable()
export class ExistentCategoryPipe implements PipeTransform {
  constructor(private readonly categoriesService: CategoriesService) {}

  async transform(rawId: string) {
    const id = Number(rawId);
    if (isNaN(id))
      throw new BadRequestException(
        'La búsqueda de categoría debe ser por ID.',
      );

    const category = await this.categoriesService.getCategoryById(id);
    if (!category) throw new NotFoundException('Esta categoría no existe.');

    return id;
  }
}
