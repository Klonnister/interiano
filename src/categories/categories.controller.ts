import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from '@prisma/client';
import { updateCategoryDTO } from './dto/category.dto';
import { ProductsService } from '../products/products.service';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('categories')
export class CategoriesController {
  constructor(
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
  ) {}

  @Get()
  @Public()
  getCategories(@Query('name') name: string): Promise<Category[]> {
    return this.categoriesService.getCategories(name);
  }

  @Get(':id')
  @Public()
  async getCategoryById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Category> {
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
    @Param('id', ParseIntPipe) id: number,
    @Body() data: updateCategoryDTO,
  ): Promise<Category> {
    try {
      return await this.categoriesService.updateCategory(id, data);
    } catch (error) {
      throw new NotFoundException('Category does not exist');
    }
  }

  @Delete(':id')
  async deleteCategory(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Category> {
    // Product constraint validation
    const products = await this.productsService.getProductsByCategory(id);
    if (products.length)
      throw new ConflictException(
        'Can not delete category when a product is associated with it.',
      );

    // Delete request
    try {
      return await this.categoriesService.deleteCategory(id);
    } catch (error) {
      throw new NotFoundException('Category does not exist');
    }
  }
}
