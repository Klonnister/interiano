import {
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
import { existsSync } from 'fs';
import { diskStorage } from 'multer';
import { Public } from 'src/auth/decorators/public.decorator';
import { ValidProductPipe } from './pipes/valid-product.pipe';
import { ExistentProductPipe } from './pipes/existent-product.pipe';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @Public()
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
    @Query('components') components: string,
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
      components,
      size,
      priceMin,
      priceMax,
      sale,
    );
  }

  @Post()
  async createProduct(
    @Body(ValidProductPipe) data: productDTO,
  ): Promise<Product> {
    return this.productsService.createProduct(data);
  }

  @Post('images')
  @UseInterceptors(
    FileInterceptor('images', {
      limits: {
        fileSize: 1000000,
      },
      storage: diskStorage({
        destination: './public/',
        filename: async (req, file, cb) => {
          //? Validate if public directory exists
          if (!existsSync('./public')) {
            await mkdir('./public');
          }

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
  async saveProductImage(
    @UploadedFile() images: Express.Multer.File,
  ): Promise<string> {
    return `/${images.filename}`;
  }

  @Get(':id')
  @Public()
  async getProductById(
    @Param('id', ExistentProductPipe) id: number,
  ): Promise<Product> {
    return await this.productsService.getProductById(id);
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
    return await this.productsService.deleteProduct(id);
  }
}
