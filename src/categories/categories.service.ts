import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Category } from '@prisma/client';
import { updateCategoryDTO } from './dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  getCategories() {
    return this.prisma.category.findMany();
  }

  createCategory(data: Category): Promise<Category> {
    return this.prisma.category.create({
      data,
    });
  }

  updateCategory(id: number, data: updateCategoryDTO): Promise<Category> {
    return this.prisma.category.update({
      where: { id },
      data,
    });
  }

  deleteCategory(id: number): Promise<Category> {
    return this.prisma.category.delete({
      where: { id },
    });
  }
}
