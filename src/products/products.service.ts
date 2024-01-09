import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from '@prisma/client';
import { updateProductDTO } from './dto/product.dto';
// import { mkdir } from 'fs/promises';
// import { existsSync } from 'fs';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  getProducts(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  getProductsByTrademark(trademark: number) {
    return this.prisma.product.findMany({
      where: {
        trademark_id: trademark,
      },
    });
  }

  getProductById(id: number): Promise<Product> {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  async createProduct(data: Product): Promise<Product> {
    //? Images folder
    // const imageFolder = './public';
    // if (!existsSync(imageFolder)) {
    //   await mkdir(imageFolder);
    // }
    return this.prisma.product.create({
      data,
    });
  }

  updateProduct(id: number, data: updateProductDTO) {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }
}
