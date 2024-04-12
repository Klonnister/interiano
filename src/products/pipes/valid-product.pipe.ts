import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CategoriesService } from 'src/categories/categories.service';
import { TrademarksService } from 'src/trademarks/trademarks.service';
import { productDTO } from '../dto/product.dto';
import { isAssignablePath } from 'src/images/helpers/imagePathHelpers';

@Injectable()
export class ValidProductPipe implements PipeTransform {
  constructor(
    private trademarksService: TrademarksService,
    private categoriesService: CategoriesService,
  ) {}

  async transform(product: productDTO) {
    const category = await this.categoriesService.getCategoryById(
      product.category_id,
    );
    if (!category)
      throw new BadRequestException('Seleccione una categoría existente.');

    const trademark = await this.trademarksService.getTrademarkById(
      product.trademark_id,
    );
    if (!trademark)
      throw new BadRequestException('Seleccione una marca existente.');

    if (!isAssignablePath(product.image))
      throw new BadRequestException(
        'Error al guardar imagen. Por favor seleccione otra.',
      );

    return product;
  }
}
