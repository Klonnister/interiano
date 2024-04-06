import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CategoryDTO } from '../dto/category.dto';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class ExistentCategoryPipe implements PipeTransform {
  constructor(private readonly categoriesService: CategoriesService) {}

  async transform(data: CategoryDTO) {
    const { name } = data;

    const category = await this.categoriesService.getCategoryByName(name);
    if (category) throw new BadRequestException('Esta categoría ya existe.');

    return data;
  }
}
