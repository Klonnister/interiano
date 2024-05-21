import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { TrademarksService } from './trademarks.service';
import { TrademarkDTO } from './dto/trademark.dto';
import { Trademark } from '@prisma/client';
import { ExistentTrademarkPipe } from './pipes/existent-trademark.pipe';
import { DeletableTrademarkPipe } from './pipes/deletable-trademark.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { ValidTrademarkPipe } from './pipes/valid-trademark.pipe';
import { unlinkSync } from 'fs';
import { ValidImagePipe } from 'src/images/pipes/valid-image.pipe';
import getImageOptions from '../images/helpers/imageOptionsHelper';
import {
  isAssignablePath,
  isDeletablePath,
} from 'src/images/helpers/imagePathHelpers';

@Controller('trademarks')
export class TrademarksController {
  constructor(private readonly trademarksService: TrademarksService) {}

  @Get()
  getTrademarks(
    @Query('name') name: string,
    @Query('page', new ParseIntPipe({ optional: true })) page: number,
  ) {
    return this.trademarksService.getTrademarks(name, page);
  }

  @Get(':id')
  async getTrademarkById(
    @Param('id', ValidTrademarkPipe) id: number,
  ): Promise<Trademark> {
    return await this.trademarksService.getTrademarkById(id);
  }

  @Post('images')
  @UseInterceptors(
    FileInterceptor('images', getImageOptions('./public/trademark-imgs')),
  )
  saveImage(
    @UploadedFile(ValidImagePipe) images: Express.Multer.File,
    @Body('previousImage') previousImage: string,
  ) {
    if (isDeletablePath(previousImage)) unlinkSync(`./public${previousImage}`);

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
    if (!isAssignablePath(data.image))
      throw new BadRequestException(
        'Error al guardar imagen, seleccione otra.',
      );

    return await this.trademarksService.updateTrademark(id, data);
  }

  @Delete(':id')
  async deleteTrademark(
    @Param('id', DeletableTrademarkPipe) id: number,
  ): Promise<Trademark> {
    const trademark = await this.getTrademarkById(id);
    if (isDeletablePath(trademark.image)) {
      unlinkSync(`./public${trademark.image}`);
    }

    return await this.trademarksService.deleteTrademark(id);
  }
}
