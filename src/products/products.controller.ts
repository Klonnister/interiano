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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '@prisma/client';
import { updateProductDTO } from './dto/product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { diskStorage } from 'multer';

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

  @Post('images')
  @UseInterceptors(
    FileInterceptor('images', {
      storage: diskStorage({
        destination: './public/',
        filename: async (req, file, cb) => {
          //? Validate if public directory exists
          const imageFolder = './public';
          if (!existsSync(imageFolder)) {
            await mkdir(imageFolder);
          }

          // create image name
          const time = new Date().getTime();
          const ext = file.originalname.slice(file.originalname.indexOf('.'));

          return cb(null, `${time}${ext}`);
        },
      }),
    }),
  )
  async saveProductImage(@UploadedFile() images: Express.Multer.File) {
    return `/${images.filename}`;
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
