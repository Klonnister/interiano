import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CategoriesService } from 'src/categories/categories.service';
import { TrademarksService } from 'src/trademarks/trademarks.service';
import { productDTO } from '../dto/product.dto';

@Injectable()
export class ValidProductPipe implements PipeTransform {
  constructor(
    private trademarksService: TrademarksService,
    private categoriesService: CategoriesService,
  ) {}
  async transform(product: productDTO) {
    const categories = await this.categoriesService.getCategoriesId();
    const categoryExists = categories.some((category) => {
      return category.id === product.category_id;
    });

    if (!categoryExists)
      throw new BadRequestException('Seleccione una categoría existente.');

    const trademarks = await this.trademarksService.getTrademarksId();
    const trademarkExists = trademarks.some((trademark) => {
      return trademark.id === product.trademark_id;
    });

    if (!trademarkExists)
      throw new BadRequestException('Seleccione una marca existente.');

    return product;
  }
}
