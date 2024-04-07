import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { Match } from 'src/auth/decorators/match.decorator';

export class ProfileDto {
  @IsNotEmpty({
    message: 'Ingrese un nuevo nombre de usuario',
  })
  @IsString({
    message: 'Ingrese un nombre de usuario válido',
  })
  username: string;

  @IsOptional()
  @IsString({
    message: 'Ingrese la imagen del usuario',
  })
  image?: string;
}

export class UpdatePasswordDto {
  @IsString({
    message: 'La contraseña es incorrecta.',
  })
  @IsNotEmpty({
    message: 'Ingrese la contraseña actual.',
  })
  oldpassword: string;

  @IsString({
    message: 'Ingrese una nueva contraseña válida.',
  })
  @IsNotEmpty({
    message: 'Ingrese la nueva contraseña.',
  })
  @Transform(({ value }) => String(value).trim())
  @IsStrongPassword(
    {
      minLowercase: 0,
      minUppercase: 0,
      minLength: 6,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'La contraseña nueva debe contener un número, un simbolo y 6 caracteres como minimo.',
    },
  )
  newpassword: string;

  @IsNotEmpty({
    message: 'Ingrese la confirmación de la nueva contraseña.',
  })
  @Transform(({ value }) => String(value).trim())
  @Match('newpassword', {
    message: 'Las contraseñas nuevas deben ser iguales',
  })
  newpasswordconfirm: string;
}
