import { PrismaService, prisma } from '../prisma/prisma.service';
import { Product } from '@prisma/client';
import { productDTO } from './dto/product.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async getProducts(
    categories: number[],
    trademarks: number[],
    title: string,
    size: string,
    priceMin: number,
    priceMax: number,
    sale: boolean,
    page: number,
  ) {
    const [products, meta] = await prisma.product
      .paginate({
        where: {
          title: {
            contains: title,
          },
          size: {
            contains: size,
          },
          category_id: {
            in: categories,
          },
          trademark_id: {
            in: trademarks,
          },
          price: {
            gte: priceMin,
            lte: priceMax,
          },
          sale,
        },
        include: {
          category: true,
          trademark: true,
        },
      })
      .withPages({
        limit: 12,
        includePageCount: true,
        page: page ? page : 1,
      });

    return { products, meta };
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
      include: {
        category: true,
        trademark: true,
      },
    });
  }

  async createProduct(data: productDTO): Promise<Product> {
    return this.prisma.product.create({
      data,
    });
  }

  updateProduct(id: number, data: productDTO): Promise<Product> {
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
