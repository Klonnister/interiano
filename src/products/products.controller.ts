import {
  BadRequestException,
  Body,
  Controller,
  Delete,
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
  getProducts(): Promise<Product[]> {
    return this.productsService.getProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') rawId: string): Promise<Product> {
    // Numeric id validation
    const id = Number(rawId);
    if (isNaN(id)) {
      throw new BadRequestException('Product search must be by id.');
    }

    const product = await this.productsService.getProductById(id);
    if (!product) throw new NotFoundException("Product doesn't exist");
    return product;
  }

  @Post()
  createProduct(@Body() data: Product): Promise<Product> {
    return this.productsService.createProduct(data);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') rawId: number,
    @Body() data: updateProductDTO,
  ): Promise<Product> {
    // Numeric id validation
    const id = Number(rawId);
    if (isNaN(id)) {
      throw new BadRequestException('Product update must be by id');
    }

    // Update completed validation
    const product = this.productsService.updateProduct(id, data);
    if (!product) {
      throw new BadRequestException('Fields were not filled correctly');
    }

    return product;
  }

  @Delete(':id')
  async deleteProduct(@Param('id') rawId: number): Promise<Product> {
    // Numeric id validation
    const id = Number(rawId);
    if (isNaN(id)) {
      throw new BadRequestException('Id must be a number');
    }

    try {
      return await this.productsService.deleteProduct(id);
    } catch (error) {
      throw new NotFoundException('Product does not exist.');
    }
  }
}
