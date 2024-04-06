import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class productDTO {
  @IsInt({
    message: 'Seleccione una categoría existente.',
  })
  category_id: number;
  @IsInt({
    message: 'Especifique una marca existente.',
  })
  trademark_id: number;
  @IsNotEmpty({
    message: "El campo 'Título' no puede estar vacío.",
  })
  @IsString({
    message: "El campo 'Título' debe ser texto.",
  })
  @MaxLength(80, {
    message: "La longitud máxima del campo 'Título' es de 40 caracteres.",
  })
  title: string;
  @IsNotEmpty({
    message: "El campo 'Imagen' no puede estar vacío.",
  })
  @IsString({
    message: 'Error al guardar imagen',
  })
  image: string;
  @IsOptional()
  @IsString({
    message: "El campo 'Tamaño' debe ser texto.",
  })
  @MaxLength(20, {
    message: "La longitud máxima del campo 'Tamaño' es de 20 caracteres.",
  })
  size?: string;
  @IsOptional()
  @IsString({
    message: "El campo 'Descripción' debe ser texto.",
  })
  @MaxLength(500, {
    message: "La longitud máxima del campo 'Descripción' es de 500 caracteres.",
  })
  description?: string;
  @IsNotEmpty({
    message: "El campo 'Precio' no puede estar vacío.",
  })
  @IsNumber(
    {
      maxDecimalPlaces: 2,
    },
    {
      message: "'Precio' debe ser un número con máximo 2 decimales.",
    },
  )
  @Min(0.01, {
    message: "El campo 'Precio' debe ser mayor a 0.",
  })
  @Max(999999.99, {
    message: "El campo 'Precio' debe ser menor a 1,000,000.",
  })
  price: number;
  @IsNotEmpty({
    message: "El campo 'En existencia' no puede estar vacío.",
  })
  @IsInt({
    message: "El campo 'En existencia' debe ser un número sin decimales.",
  })
  @Max(99999, {
    message: "El campo 'En existencia' debe ser un número entre 0 y 100,000.",
  })
  stock: number;
  @IsNotEmpty({
    message:
      "Error al guardar 'Otras propiedades'. Comunique al desarrollador.",
  })
  @IsObject({
    message:
      "Error al guardar 'Otras propiedades'. Comunique al desarrollador.",
  })
  extra_props: object;
  @IsNotEmpty({
    message: "Error al guardar 'Oferta'. Comunique al desarrollador.",
  })
  @IsBoolean({
    message: "Error al guardar 'Oferta'. Comunique al desarrollador.",
  })
  sale: boolean;
  @IsNotEmpty({
    message: "El campo 'Precio ofertado' no puede estar vacío.",
  })
  @IsNumber(
    {
      maxDecimalPlaces: 2,
    },
    {
      message: "'Precio ofertado' debe ser un número con máximo 2 decimales.",
    },
  )
  @Max(999999.99, {
    message: "El campo 'Precio ofertado' debe ser menor a 1,000,000.",
  })
  sale_price: number;
  @IsInt({
    message: 'Seleccione un diseño para su producto.',
  })
  design: number;
}

// {
//   "category_id": 1,
//   "trademark_id": 1,
//   "title": "Anticaída y fortalecimiento",
//   "images": "/1705009444448.jpg",
//   "size": "650 ml",
//   "description": "El mejor shampoo para cabello dañado, nutre desde raíz a puntas y ayuda al fortalecimiento completo del cabello",
//   "stock": 2,
//   "price": 80.52,
//   "sale": false,
//   "sale_price": 0,
//   "extra_props": {
//     "tamaño": "Mediano"
//   },
//   "design": 1
// }
