import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from '@prisma/client';
import { CategoryDTO } from './dto/category.dto';
import { ValidCategoryPipe } from './pipes/valid-category.pipe';
import { DeletableCategoryPipe } from './pipes/deletable-category.pipe';
import { ExistentCategoryPipe } from './pipes/existent-category.pipe';
import { CategoryOrderPipe } from './pipes/category-order.pipe';
import { CategoryOrder } from './types/categoryOrder.interface';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getCategories(
    @Query('name') name: string,
    @Query('order', CategoryOrderPipe) order: CategoryOrder,
    @Query(
      'raw',
      new ParseBoolPipe({
        optional: true,
      }),
    )
    raw: boolean,
    @Query('page', new ParseIntPipe({ optional: true })) page: number,
  ) {
    return this.categoriesService.getCategories(name, order, raw, page);
  }

  @Get(':id')
  async getCategoryById(
    @Param('id', ValidCategoryPipe) id: number,
  ): Promise<Category> {
    return await this.categoriesService.getCategoryById(id);
  }

  @Post()
  createCategory(
    @Body(ExistentCategoryPipe) data: CategoryDTO,
  ): Promise<Category> {
    return this.categoriesService.createCategory(data);
  }

  @Patch(':id')
  async updateCategory(
    @Param('id', ValidCategoryPipe) id: number,
    @Body() data: CategoryDTO,
  ): Promise<Category> {
    return await this.categoriesService.updateCategory(id, data);
  }

  @Delete(':id')
  async deleteCategory(
    @Param('id', DeletableCategoryPipe) id: number,
  ): Promise<Category> {
    return await this.categoriesService.deleteCategory(id);
  }
}
