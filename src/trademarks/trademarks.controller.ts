import {
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
import { existsSync, unlinkSync } from 'fs';
import { mkdir } from 'fs/promises';
import { ValidTrademarkPipe } from './pipes/valid-trademark.pipe';

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

  @Post()
  @UseInterceptors(
    FileInterceptor('images', {
      limits: {
        fileSize: 1000000,
      },
      storage: diskStorage({
        destination: async (req, file, cb) => {
          // Validate if public directory exists
          if (!existsSync('./public/trademark-imgs')) {
            await mkdir('./public/trademark-imgs');
          }

          cb(null, './public/trademark-imgs');
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
  createTrademark(
    @Body(ExistentTrademarkPipe) data: TrademarkDTO,
    @UploadedFile() images: Express.Multer.File,
  ): Promise<Trademark> {
    if (images) {
      data.image = `/trademark-imgs/${images.filename}`;
    }

    return this.trademarksService.createTrademark(data);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('images', {
      limits: {
        fileSize: 1000000,
      },
      storage: diskStorage({
        destination: async (req, file, cb) => {
          // Validate if public directory exists
          if (!existsSync('./public/trademark-imgs')) {
            await mkdir('./public/trademark-imgs');
          }

          cb(null, './public/trademark-imgs');
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
  async updateTrademark(
    @Param('id', ValidTrademarkPipe) id: number,
    @UploadedFile() images: Express.Multer.File,
    @Body() data: TrademarkDTO,
  ): Promise<Trademark> {
    if (images) {
      if (data.image) {
        unlinkSync(`./public${data.image}`);
      }

      data.image = `/trademark-imgs/${images.filename}`;
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
