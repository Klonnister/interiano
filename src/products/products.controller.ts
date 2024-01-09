import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '@prisma/client';
import { updateProductDTO } from './dto/product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async getProducts() {
    const products = await this.productsService.getProducts();
    if (!products.length) throw new NotFoundException('No products found.');
    return products;
  }

  @Get(':id')
  async getProductById(@Param('id') rawId: string) {
    const id = Number(rawId);
    if (isNaN(id)) {
      throw new BadRequestException('Product search must be by id.');
    }

    const product = await this.productsService.getProductById(id);
    if (!product) throw new NotFoundException("Product doesn't exist");
    return product;
  }

  @Post()
  createProduct(@Body() data: Product) {
    return this.productsService.createProduct(data);
  }

  @Patch(':id')
  updateProduct(@Param('id') rawId: number, @Body() data: updateProductDTO) {
    const id = Number(rawId);
    if (isNaN(id)) {
      throw new BadRequestException('Product search must be by id.');
    }

    const product = this.productsService.updateProduct(id, data);

    if (!product) {
      throw new BadRequestException('Fields were not filled correctly');
    }

    return product;
  }
}
