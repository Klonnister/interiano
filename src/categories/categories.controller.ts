import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from '@prisma/client';
import { updateCategoryDTO } from './dto/category.dto';
import { ProductsService } from '../products/products.service';

@Controller('categories')
export class CategoriesController {
  constructor(
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
  ) {}

  @Get()
  getCategories(@Query('name') name: string): Promise<Category[]> {
    return this.categoriesService.getCategories(name);
  }

  @Get(':id')
  async getCategoryById(@Param('id') rawId: string): Promise<Category> {
    const id = Number(rawId);
    if (isNaN(id)) {
      throw new BadRequestException('Id must be a number.');
    }

    const category = await this.categoriesService.getCategoryById(id);
    if (!category) throw new NotFoundException('Category does not exist');
    return category;
  }

  @Post()
  createCategory(@Body() data: Category): Promise<Category> {
    return this.categoriesService.createCategory(data);
  }

  @Patch(':id')
  async updateCategory(
    @Param('id') rawId: string,
    @Body() data: updateCategoryDTO,
  ): Promise<Category> {
    const id = Number(rawId);
    if (isNaN(id)) {
      throw new BadRequestException('Id must be a number.');
    }

    try {
      return await this.categoriesService.updateCategory(id, data);
    } catch (error) {
      throw new NotFoundException('Category does not exist');
    }
  }

  @Delete(':id')
  async deleteCategory(@Param('id') rawId: string): Promise<Category> {
    const id = Number(rawId);
    if (isNaN(id)) {
      throw new BadRequestException('Id must be a number.');
    }

    const products = await this.productsService.getProductsByCategory(id);
    if (products.length)
      throw new ConflictException(
        'Can not delete category when a product is associated with it.',
      );

    try {
      return await this.categoriesService.deleteCategory(id);
    } catch (error) {
      throw new NotFoundException('Category does not exist');
    }
  }
}
