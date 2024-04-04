import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CategoryDTO {
  @IsNotEmpty({
    message: "El campo 'Nombre' no puede estar vacío.",
  })
  @IsString({
    message: "El campo 'Nombre' debe ser texto.",
  })
  @MaxLength(30, {
    message: "La longitud máxima del campo 'Nombre' es de 35 caracteres.",
  })
  name: string;
}
