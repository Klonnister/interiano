import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  ParseBoolPipe,
  ParseFloatPipe,
  Patch,
  Post,
  Query,
  UnsupportedMediaTypeException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '@prisma/client';
import { productDTO } from './dto/product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { mkdir } from 'fs/promises';
import { existsSync, unlinkSync } from 'fs';
import { diskStorage } from 'multer';
import { ValidProductPipe } from './pipes/valid-product.pipe';
import { ExistentProductPipe } from './pipes/existent-product.pipe';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

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
  ): Promise<Product[]> {
    return this.productsService.getProducts(
      categories,
      trademarks,
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
    FileInterceptor('images', {
      limits: {
        fileSize: 1000000,
      },
      storage: diskStorage({
        destination: async (req, file, cb) => {
          // Validate if public directory exists
          if (!existsSync('./public/product-imgs')) {
            await mkdir('./public/product-imgs');
          }

          cb(null, './public/product-imgs');
        },
        filename: (req, file, cb) => {
          // create image name
          const time = new Date().getTime();
          const ext = file.originalname.slice(
            file.originalname.lastIndexOf('.'),
          );
          const imageName = time + ext;
          const acceptedExts = ['.jpeg', '.jpg', '.png', '.webp', '.svg'];

          if (!acceptedExts.includes(ext)) {
            return cb(
              new UnsupportedMediaTypeException(
                'El archivo debe ser de tipo imagen.',
              ),
              null,
            );
          }

          return cb(null, imageName);
        },
      }),
    }),
  )
  saveImage(
    @UploadedFile() images: Express.Multer.File,
    @Body('previousImage') previousImage: string,
  ) {
    if (!images) {
      throw new BadRequestException('Seleccione una imagen para guardar.');
    }

    if (previousImage) {
      unlinkSync(`./public${previousImage}`);
    }

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
    const product = await this.productsService.getProductById(id);

    if (product.image !== data.image) {
      unlinkSync(`./public${product.image}`);
    }

    return await this.productsService.updateProduct(id, data);
  }

  @Delete(':id')
  async deleteProduct(
    @Param('id', ExistentProductPipe) id: number,
  ): Promise<Product> {
    const product = await this.productsService.getProductById(id);
    unlinkSync(`./public${product.image}`);
    return await this.productsService.deleteProduct(id);
  }
}
