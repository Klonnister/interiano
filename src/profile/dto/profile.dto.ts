import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';
import { Match } from 'src/auth/decorators/match.decorator';

export class ProfileDto {
  username: string;
  image?: string;
}

export class UpdatePasswordDto {
  @IsString({
    message: 'Ingrese una contraseña válida.',
  })
  @IsNotEmpty({
    message: 'Ingrese la antigua contraseña.',
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
        'La contraseña debe contener un número, un simbolo y 6 caracteres como minimo.',
    },
  )
  newpassword: string;

  @IsString({
    message: 'Ingrese una confirmación válida.',
  })
  @IsNotEmpty({
    message: 'Ingrese la confirmación de la nueva contraseña.',
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
  @Match('newpassword', {
    message: 'Las contraseñas deben ser iguales',
  })
  newpasswordconfirm: string;
}
