import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { readdir, readdirSync, unlinkSync } from 'fs';
import { Public } from 'src/auth/decorators/public.decorator';
import getImageOptions from 'src/images/helpers/imageOptionsHelper';
import { isDeletablePath } from 'src/images/helpers/imagePathHelpers';
import { ValidImagePipe } from 'src/images/pipes/valid-image.pipe';

@Controller('guest')
export class GuestController {
  @Post('images')
  @Public()
  @UseInterceptors(
    FileInterceptor('images', getImageOptions('./public/guest-imgs')),
  )
  saveImage(
    @UploadedFile(ValidImagePipe) images: Express.Multer.File,
    @Body('previousImage') previousImage: string,
  ) {
    if (isDeletablePath(previousImage)) unlinkSync(`./public${previousImage}`);

    return { path: `/guest-imgs/${images.filename}` };
  }

  @Get()
  getGuestImages() {
    const images = readdirSync('./public/guest-imgs');

    return images.map((image) => {
      return `/guest-imgs/${image}`;
    });
  }

  @Delete()
  deleteGuestImages() {
    const images = readdirSync('./public/guest-imgs');
    if (!images.length)
      throw new NotFoundException('No hay imágenes para eliminar');

    readdir('./public/guest-imgs', (err, files) => {
      if (err) throw err;

      for (const file of files) {
        unlinkSync(`./public/guest-imgs/${file}`);
      }
    });
  }
}
