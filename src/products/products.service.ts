import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from '@prisma/client';
import { createProductDTO, updateProductDTO } from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  getProducts(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  getProductsByTrademark(trademark_id: number): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: {
        trademark_id,
      },
    });
  }

  getProductsByCategory(category_id: number): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: {
        category_id,
      },
    });
  }

  getProductById(id: number): Promise<Product> {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  async createProduct(data: createProductDTO): Promise<Product> {
    return this.prisma.product.create({
      data,
    });
  }

  updateProduct(id: number, data: updateProductDTO): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  deleteProduct(id: number): Promise<Product> {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
