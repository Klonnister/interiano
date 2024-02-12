import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from '@prisma/client';
import { updateCategoryDTO } from './dto/category.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { ExistentCategoryPipe } from './pipes/existent-category.pipe';
import { UnboundCategoryPipe } from './pipes/unbound-category.pipe';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  @Public()
  getCategories(@Query('name') name: string): Promise<Category[]> {
    return this.categoriesService.getCategories(name);
  }

  @Get(':id')
  @Public()
  async getCategoryById(
    @Param('id', ExistentCategoryPipe) id: number,
  ): Promise<Category> {
    return await this.categoriesService.getCategoryById(id);
  }

  @Post()
  createCategory(@Body() data: Category): Promise<Category> {
    return this.categoriesService.createCategory(data);
  }

  @Patch(':id')
  async updateCategory(
    @Param('id', ExistentCategoryPipe) id: number,
    @Body() data: updateCategoryDTO,
  ): Promise<Category> {
    return await this.categoriesService.updateCategory(id, data);
  }

  @Delete(':id')
  async deleteCategory(
    @Param('id', UnboundCategoryPipe) id: number,
  ): Promise<Category> {
    return await this.categoriesService.deleteCategory(id);
  }
}
