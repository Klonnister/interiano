import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';
import { Match } from '../decorators/match.decorator';

export class RegisterDto {
  @IsNotEmpty({
    message: 'Ingrese un nombre de usuario.',
  })
  @IsString({
    message: 'Ingrese un nombre de usuario valido.',
  })
  username: string;
  @Transform(({ value }) => value.trim())
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

  @Transform(({ value }) => value.trim())
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
  @Match('password', {
    message: 'Las contraseñas deben ser iguales',
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
  password: string;

  @IsNotEmpty({
    message: 'a',
  })
  passwordconfirm: string;
}
