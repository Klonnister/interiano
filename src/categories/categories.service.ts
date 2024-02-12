import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Category } from '@prisma/client';
import { updateCategoryDTO } from './dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async getCategories(name: string): Promise<Category[]> {
    return this.prisma.category.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
  }

  getCategoryById(id: number): Promise<Category> {
    return this.prisma.category.findUnique({
      where: { id },
    });
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
