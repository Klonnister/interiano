import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class createUserDto {
  @IsNotEmpty({
    message: 'Ingrese un nombre de usuario.',
  })
  @IsString({
    message: 'Ingrese un nombre de usuario valido.',
  })
  username: string;
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
}
