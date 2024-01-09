import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from '@prisma/client';
import { updateCategoryDTO } from './dto/category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getCategories() {
    return this.categoriesService.getCategories();
  }

  @Post()
  createCategory(@Body() data: Category) {
    return this.categoriesService.createCategory(data);
  }

  @Patch(':id')
  async updateCategory(
    @Param('id') rawId: string,
    @Body() data: updateCategoryDTO,
  ) {
    const id = Number(rawId);
    if (isNaN(id)) {
      throw new BadRequestException('No category found.');
    }

    try {
      return await this.categoriesService.updateCategory(id, data);
    } catch (error) {
      throw new BadRequestException('Fields were not filled correctly.');
    }
  }

  @Delete(':id')
  async deleteCategory(@Param('id') rawId: string) {
    const id = Number(rawId);
    if (isNaN(id)) {
      throw new BadRequestException('No category found.');
    }

    try {
      return await this.categoriesService.deleteCategory(id);
    } catch (error) {
      throw new BadRequestException('Fields were not filled correctly.');
    }
  }
}
