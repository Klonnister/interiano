import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ProductDiscontinuedPipe implements PipeTransform {
  transform(discontinued: string) {
    if (!discontinued) return undefined;
    else if (discontinued === 'hideDiscontinued') return false;
    else if (discontinued === 'onlyDiscontinued') return true;
    else
      throw new BadRequestException(
        'Error al aplicar filtro de descontinuados',
      );
  }
}
