import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ProfileDto } from '../dto/profile.dto';
import { isAssignablePath } from 'src/images/helpers/imagePathHelpers';

@Injectable()
export class ValidProfilePipe implements PipeTransform {
  transform(data: ProfileDto) {
    if (!isAssignablePath(data.image)) {
      throw new BadRequestException(
        'Error al guardar imagen. Seleccione otra.',
      );
    }

    return data;
  }
}
