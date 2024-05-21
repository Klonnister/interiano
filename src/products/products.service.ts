import { PrismaService } from '../prisma/prisma.service';
import { Product } from '@prisma/client';
import { productDTO } from './dto/product.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { paginate } from 'src/prisma/helpers/paginator';
import { unlinkSync } from 'fs';
import { isDeletablePath } from 'src/images/helpers/imagePathHelpers';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

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
    const productsTrademark = await this.prisma.product.findMany({
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
        applied_price: {
          gte: priceMin,
          lte: priceMax,
        },
        sale,
      },
      orderBy: {
        trademark: {
          name: 'asc',
        },
      },
      select: { trademark: true },
    });

    const trademarkIds = [];

    const filterTrademarks = productsTrademark
      .map((rawTrademark) => {
        if (!trademarkIds.includes(rawTrademark.trademark.id)) {
          trademarkIds.push(rawTrademark.trademark.id);
          return {
            id: rawTrademark.trademark.id,
            name: rawTrademark.trademark.name,
            image: rawTrademark.trademark.image,
          };
        }
      })
      .filter((trademark) => trademark != null);

    return paginate(
      this.prisma.product,
      {
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
          applied_price: {
            gte: priceMin,
            lte: priceMax,
          },
          sale,
        },
        // orderBy: {
        //   applied_price: 'desc',
        // },
        include: {
          category: true,
          trademark: true,
        },
      },
      {
        page,
      },
      filterTrademarks,
    );
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
    try {
      return await this.prisma.product.create({
        data: {
          ...data,
          applied_price: data.sale ? data.sale_price : data.price,
        },
      });
    } catch (error) {
      throw new BadRequestException(
        'Se recibió información no esperada. Por favor revise.',
      );
    }
  }

  async updateProduct(id: number, data: productDTO): Promise<Product> {
    try {
      const product = await this.getProductById(id);
      const previousImage = product.image;

      const updatedProduct = await this.prisma.product.update({
        where: { id },
        data: {
          ...data,
          applied_price: data.sale ? data.sale_price : data.price,
        },
      });

      if (previousImage !== data.image && isDeletablePath(previousImage)) {
        unlinkSync(`./public${previousImage}`);
      }

      return updatedProduct;
    } catch (error) {
      throw new BadRequestException(
        'Se recibió información no esperada. Por favor revise.',
      );
    }
  }

  deleteProduct(id: number): Promise<Product> {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
