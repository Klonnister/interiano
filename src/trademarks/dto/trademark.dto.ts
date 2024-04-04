import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class TrademarkDTO {
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
  image?: string;
  images?: any;
}

export class updateTrademarkDTO {
  name: string;
  logo?: string;
}
