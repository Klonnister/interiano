import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ProfileDto } from '../dto/profile.dto';
import { existsSync } from 'fs';

@Injectable()
export class ValidProfilePipe implements PipeTransform {
  transform(data: ProfileDto) {
    if (data.image && !existsSync(`./public${data.image}`)) {
      throw new BadRequestException(
        'Error al guardar imagen. Seleccione otra.',
      );
    }

    return data;
  }
}
