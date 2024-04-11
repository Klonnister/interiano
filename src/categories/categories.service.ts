import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Category } from '@prisma/client';
import { CategoryDTO } from './dto/category.dto';
import { paginate } from 'src/prisma/paginator';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async getCategories(name: string, page: number) {
    return paginate(
      this.prisma.category,
      {
        where: {
          name: {
            contains: name,
          },
        },
      },
      {
        page,
      },
    );
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

  async createCategory(data: CategoryDTO): Promise<Category> {
    try {
      return await this.prisma.category.create({
        data,
      });
    } catch (error) {
      throw new BadRequestException(
        'Se recibió información no esperada. Por favor revise.',
      );
    }
  }

  async updateCategory(id: number, data: CategoryDTO): Promise<Category> {
    const foundCategory = await this.getCategoryByName(data.name);
    if (foundCategory) {
      if (foundCategory.id !== id)
        throw new BadRequestException('Esta categoría ya existe.');
    }

    try {
      return await this.prisma.category.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new BadRequestException(
        'Se recibió información no esperada. Por favor revise.',
      );
    }
  }

  deleteCategory(id: number): Promise<Category> {
    return this.prisma.category.delete({
      where: { id },
    });
  }
}
