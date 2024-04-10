import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Category } from '@prisma/client';
import { CategoryDTO } from './dto/category.dto';
import { prisma } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async getCategories(name: string, page: number) {
    const [users, meta] = await prisma.category
      .paginate({
        where: {
          name: {
            contains: name,
          },
        },
      })
      .withPages({
        limit: 12,
        includePageCount: true,
        page: page ? page : 1,
      });

    return { users, meta };
  }

  getCategoryById(id: number): Promise<Category> {
    return this.prisma.category.findUnique({
      where: { id },
    });
  }

  getCategoryByName(name: string): Promise<Category> {
    return this.prisma.category.findFirst({
      where: { name },
    });
  }

  createCategory(data: CategoryDTO): Promise<Category> {
    return this.prisma.category.create({
      data,
    });
  }

  async updateCategory(id: number, data: CategoryDTO): Promise<Category> {
    const foundCategory = await this.getCategoryByName(data.name);
    if (foundCategory) {
      if (foundCategory.id !== id)
        throw new BadRequestException('Esta categoría ya existe.');
    }

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
