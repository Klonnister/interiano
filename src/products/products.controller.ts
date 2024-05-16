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
import { Product, Trademark } from '@prisma/client';
import { productDTO } from './dto/product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { unlinkSync } from 'fs';
import { ValidProductPipe } from './pipes/valid-product.pipe';
import { ExistentProductPipe } from './pipes/existent-product.pipe';
import getImageOptions from '../images/helpers/imageOptionsHelper';
import { ValidImagePipe } from 'src/images/pipes/valid-image.pipe';
import { isDeletablePath } from 'src/images/helpers/imagePathHelpers';

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
    @Query('title') title: string,
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
  ) {
    return this.productsService.getProducts(
      categories,
      trademarks,
      title,
      size,
      priceMin,
      priceMax,
      sale,
      page,
    );
  }

  @Get('trademarks')
  async getProductsTrademark(
    @Query(
      'categories',
      new ParseArrayPipe({
        items: Number,
        separator: ',',
        optional: true,
      }),
    )
    categories: number[],
    @Query('title') title: string,
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
  ): Promise<Trademark[]> {
    return await this.productsService.getProductsTrademark(
      categories,
      title,
      size,
      priceMin,
      priceMax,
      sale,
    );
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

    return `/product-imgs/${images.filename}`;
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
