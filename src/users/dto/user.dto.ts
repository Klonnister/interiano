import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class createUserDto {
  @IsNotEmpty({
    message: 'Ingrese un nombre de usuario.',
  })
  @IsString({
    message: 'Ingrese un nombre de usuario valido.',
  })
  username: string;
  @IsString({
    message: 'Contraseña debe ser una cadena de texto.',
  })
  password: string;
  @IsOptional()
  @IsString({
    message: 'Error al guardar imagen',
  })
  image?: string;
}
