import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class TrademarkDTO {
  @IsNotEmpty({
    message: "El campo 'Nombre' no puede estar vacío.",
  })
  @IsString({
    message: "El campo 'Nombre' debe ser texto.",
  })
  @MaxLength(35, {
    message: "La longitud máxima del campo 'Nombre' es de 35 caracteres.",
  })
  name: string;
  @IsNotEmpty({
    message: "El campo 'Imagen' no puede estar vacío.",
  })
  @IsString({
    message: 'Error al guardar imagen',
  })
  image: string;
}
