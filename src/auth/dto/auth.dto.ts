import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';
import { Match } from '../decorators/match.decorator';

export class RegisterDto {
  @IsNotEmpty({
    message: 'Ingrese un nombre de usuario.',
  })
  @IsString({
    message: 'Ingrese un nombre de usuario válido.',
  })
  @MaxLength(12, {
    message: 'La longitud máxima del nombre de usuario es de 12 caracteres',
  })
  username: string;

  @IsString({
    message: 'Ingrese una contraseña válida.',
  })
  @IsNotEmpty({
    message: 'Ingrese la contraseña.',
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
        'La contraseña debe contener un número, un simbolo y 6 caracteres como minimo.',
    },
  )
  password: string;

  @IsString({
    message: 'Ingrese una confirmación válida.',
  })
  @IsNotEmpty({
    message: 'Ingrese la confirmación de la contraseña.',
  })
  @Transform(({ value }) => String(value).trim())
  @Match('password', {
    message: 'Las contraseñas contraseñas no coinciden',
  })
  passwordconfirm: string;
}

export class LoginDto {
  @IsNotEmpty({
    message: 'El campo usuario no puede estar vacío',
  })
  @IsString({
    message: 'El campo usuario debe ser texto',
  })
  username: string;

  @IsNotEmpty({
    message: 'El campo contraseña no puede estar vacío',
  })
  @IsString({
    message: 'Ingrese una contraseña válida',
  })
  password: string;
}
