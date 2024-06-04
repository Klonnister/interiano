import { Body, Controller, Delete } from '@nestjs/common';
import { isDeletablePath } from './helpers/imagePathHelpers';
import { unlinkSync } from 'fs';

@Controller('images')
export class ImagesController {
  @Delete()
  deleteImage(@Body('image') image: string) {
    if (isDeletablePath(image)) unlinkSync(`./public${image}`);

    return { deleted: `${image}` };
  }
}
