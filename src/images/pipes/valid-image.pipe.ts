import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidImagePipe implements PipeTransform {
  transform(file: Express.Multer.File) {
    if (!file)
      throw new BadRequestException('Seleccione una imagen para guardar.');

    return file;
  }
}
