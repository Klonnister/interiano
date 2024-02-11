import { IsNotEmpty, IsString } from 'class-validator';

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
}

export interface Profile {
  username: string;
  role: string;
}
