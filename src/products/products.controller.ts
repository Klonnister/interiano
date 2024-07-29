import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  ParseBoolPipe,
  ParseFloatPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '@prisma/client';
import { productDTO } from './dto/product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { unlinkSync } from 'fs';
import { ValidProductPipe } from './pipes/valid-product.pipe';
import { ExistentProductPipe } from './pipes/existent-product.pipe';
import getImageOptions from '../images/helpers/imageOptionsHelper';
import { ValidImagePipe } from 'src/images/pipes/valid-image.pipe';
import { isDeletablePath } from 'src/images/helpers/imagePathHelpers';
import { ProductOrderByPipe } from './pipes/product-order-by.pipe';
import { OrderBy } from './types/orderBy.interface';
import { ProductOptions } from './types/productOptions.interface';
import { ProductStockPipe } from './pipes/product-stock.pipe';
import { ProductDiscontinuedPipe } from './pipes/product-discontinued.pipe';
import { Stock } from './types/stock.interface';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts(
    @Query(
      'categories',
      new ParseArrayPipe({
        items: Number,
        separator: ',',
        optional: true,
      }),
    )
    categories: number[],
    @Query(
      'trademarks',
      new ParseArrayPipe({
        items: Number,
        separator: ',',
        optional: true,
      }),
    )
    trademarks: number[],
    @Query('name') name: string,
    @Query('size') size: string,
    @Query(
      'priceMin',
      new ParseFloatPipe({
        optional: true,
      }),
    )
    priceMin: number,
    @Query(
      'priceMax',
      new ParseFloatPipe({
        optional: true,
      }),
    )
    priceMax: number,
    @Query(
      'sale',
      new ParseBoolPipe({
        optional: true,
      }),
    )
    sale: boolean,
    @Query('page', new ParseIntPipe({ optional: true })) page: number,
    @Query('order', ProductOrderByPipe) order: OrderBy,
    @Query('stock', ProductStockPipe) stock: number | Stock | undefined,
    @Query('discontinued', ProductDiscontinuedPipe)
    discontinued: boolean | undefined,
  ) {
    return this.productsService.getProducts(
      categories,
      trademarks,
      name,
      size,
      priceMin,
      priceMax,
      sale,
      order,
      stock,
      discontinued,
      page,
    );
  }

  @Get('create')
  getProductOptions(): Promise<ProductOptions> {
    return this.productsService.getProductOptions();
  }

  @Get(':id')
  async getProductById(
    @Param('id', ExistentProductPipe) id: number,
  ): Promise<Product> {
    return await this.productsService.getProductById(id);
  }

  @Post('images')
  @UseInterceptors(
    FileInterceptor('images', getImageOptions('./public/product-imgs')),
  )
  saveImage(
    @UploadedFile(ValidImagePipe) images: Express.Multer.File,
    @Body('previousImage') previousImage: string,
  ) {
    if (isDeletablePath(previousImage)) unlinkSync(`./public${previousImage}`);

    return { path: `/product-imgs/${images.filename}` };
  }

  @Post()
  async createProduct(
    @Body(ValidProductPipe) data: productDTO,
  ): Promise<Product> {
    return this.productsService.createProduct(data);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id', ExistentProductPipe) id: number,
    @Body(ValidProductPipe) data: productDTO,
  ): Promise<Product> {
    return await this.productsService.updateProduct(id, data);
  }

  @Delete(':id')
  async deleteProduct(
    @Param('id', ExistentProductPipe) id: number,
  ): Promise<Product> {
    const product = await this.productsService.getProductById(id);

    if (isDeletablePath(product.image)) unlinkSync(`./public${product.image}`);
    return await this.productsService.deleteProduct(id);
  }
}
