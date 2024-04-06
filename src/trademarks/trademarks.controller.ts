import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UnsupportedMediaTypeException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { TrademarksService } from './trademarks.service';
import { TrademarkDTO } from './dto/trademark.dto';
import { Trademark } from '@prisma/client';
import { Public } from 'src/auth/decorators/public.decorator';
import { ExistentTrademarkPipe } from './pipes/existent-trademark.pipe';
import { DeletableTrademarkPipe } from './pipes/deletable-trademark.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ValidTrademarkPipe } from './pipes/valid-trademark.pipe';
import { unlinkSync } from 'fs';

@Controller('trademarks')
export class TrademarksController {
  constructor(private trademarksService: TrademarksService) {}

  @Get()
  @Public()
  getTrademarks(@Query('name') name: string): Promise<Trademark[]> {
    return this.trademarksService.getTrademarks(name);
  }

  @Get(':id')
  @Public()
  async getTrademarkById(
    @Param('id', ValidTrademarkPipe) id: number,
  ): Promise<Trademark> {
    return await this.trademarksService.getTrademarkById(id);
  }

  @Post('images')
  @UseInterceptors(
    FileInterceptor('images', {
      limits: {
        fileSize: 1000000,
      },
      storage: diskStorage({
        destination: './public/trademark-imgs',
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

    return `/trademark-imgs/${images.filename}`;
  }

  @Post()
  createTrademark(
    @Body(ExistentTrademarkPipe) data: TrademarkDTO,
  ): Promise<Trademark> {
    return this.trademarksService.createTrademark(data);
  }

  @Patch(':id')
  async updateTrademark(
    @Param('id', ValidTrademarkPipe) id: number,
    @Body() data: TrademarkDTO,
  ): Promise<Trademark> {
    const trademark = await this.trademarksService.getTrademarkById(id);
    if (trademark.image !== data.image) {
      unlinkSync(`./public${trademark.image}`);
    }

    return await this.trademarksService.updateTrademark(id, data);
  }

  @Delete(':id')
  async deleteTrademark(
    @Param('id', DeletableTrademarkPipe) id: number,
  ): Promise<Trademark> {
    const trademark = await this.getTrademarkById(id);
    if (trademark.image) {
      unlinkSync(`./public${trademark.image}`);
    }

    return await this.trademarksService.deleteTrademark(id);
  }
}
