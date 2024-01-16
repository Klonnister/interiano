import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
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
import { mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { diskStorage } from 'multer';
import { TrademarksService } from 'src/trademarks/trademarks.service';
import { CategoriesService } from 'src/categories/categories.service';

@Controller('products')
export class ProductsController {
  constructor(
    private productsService: ProductsService,
    private trademarksService: TrademarksService,
    private categoriesService: CategoriesService,
  ) {}

  @Get()
  getProducts(
    @Query('categories') categoriesString: string,
    @Query('trademarks') trademarksString: string,
    @Query('title') title: string,
    @Query('components') components: string,
    @Query('size') size: string,
    @Query('priceMin') rawPriceMin: string,
    @Query('priceMax') rawPriceMax: string,
    @Query('sale') rawSale: string,
  ): Promise<Product[]> {
    // Array queries transformation
    let categories: number[];
    let trademarks: number[];

    // number and boolean transformation
    let priceMin: number;
    let priceMax: number;
    let sale: boolean;

    if (rawPriceMin) {
      priceMin = Number(rawPriceMin);
      if (isNaN(priceMin))
        throw new BadRequestException(
          'Utilice valores numéricos para filtrar por precio.',
        );
    }

    if (rawPriceMax) {
      priceMax = Number(rawPriceMax);
      if (isNaN(priceMax))
        throw new BadRequestException(
          'Utilice valores numéricos para filtrar por precio.',
        );
    }

    if (rawSale) {
      if (rawSale === 'true') {
        sale = true;
      } else if (rawSale === 'false') {
        sale = false;
      } else {
        throw new BadRequestException(
          'Utilice valor booleano para filtrar por oferta.',
        );
      }
    }

    if (categoriesString) {
      categories = [];
      categoriesString.split(',').forEach((category) => {
        if (isNaN(Number(category)))
          throw new BadRequestException(
            'El parámetro category_id debe ser un array con valores numéricos',
          );

        categories.push(Number(category));
      });
    }

    if (trademarksString) {
      trademarks = [];
      trademarksString.split(',').forEach((trademark) => {
        if (isNaN(Number(trademark)))
          throw new BadRequestException(
            'El parámetro trademark_id debe ser un array con valores numéricos',
          );

        trademarks.push(Number(trademark));
      });
    }

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

  @Get(':id')
  async getProductById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Product> {
    const product = await this.productsService.getProductById(id);
    if (!product) throw new NotFoundException('Producto no encontrado.');
    return product;
  }

  @Post()
  async createProduct(@Body() data: productDTO): Promise<Product> {
    const categories = await this.categoriesService.getCategoriesId();
    const categoryExists = categories.some((category) => {
      return category.id === data.category_id;
    });

    if (!categoryExists)
      throw new BadRequestException('Seleccione una categoría existente.');

    const trademarks = await this.trademarksService.getTrademarksId();
    const trademarkExists = trademarks.some((trademark) => {
      return trademark.id === data.trademark_id;
    });

    if (!trademarkExists)
      throw new BadRequestException('Seleccione una marca existente.');

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
          const imageName = time + ext;

          return cb(null, imageName);
        },
      }),
      limits: {
        fileSize: 1000000,
      },
    }),
  )
  async saveProductImage(
    @UploadedFile() images: Express.Multer.File,
  ): Promise<string> {
    return `/${images.filename}`;
  }

  @Patch(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: productDTO,
  ): Promise<Product> {
    const categories = await this.categoriesService.getCategoriesId();
    const categoryExists = categories.some((category) => {
      return category.id === data.category_id;
    });

    if (!categoryExists)
      throw new BadRequestException('Seleccione una categoría existente.');

    const trademarks = await this.trademarksService.getTrademarksId();
    const trademarkExists = trademarks.some((trademark) => {
      return trademark.id === data.trademark_id;
    });

    if (!trademarkExists)
      throw new BadRequestException('Seleccione una marca existente.');

    // Update completed validation
    const product = this.productsService.updateProduct(id, data);
    if (!product) {
      throw new NotFoundException('Producto no encontrado.');
    }

    return product;
  }

  @Delete(':id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    try {
      return await this.productsService.deleteProduct(id);
    } catch (error) {
      throw new NotFoundException('Product does not exist.');
    }
  }
}
