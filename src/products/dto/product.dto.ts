export class createProductDTO {
  category_id: number;
  trademark_id: number;
  title: string;
  components?: string;
  images: string;
  size?: string;
  description?: string;
  price: number;
  stock: number;
  extra_props: object;
  sale: boolean;
  sale_price: number;
}

export class updateProductDTO {
  category_id?: number;
  trademark_id?: number;
  name?: string;
  line?: string;
  components?: string;
  size?: string;
  description?: string;
  extra_props?: object;
  quantity?: number;
  price?: number;
}

// {
//   "category_id": 1,
//   "trademark_id": 1,
//   "title": "Anticaída y fortalecimiento desde las puntas",
//   "components": "Coco & Pepino",
//   "images": "/1705009444448.jpg",
//   "size": "650 ml",
//   "description": "El mejor shampoo para cabello dañado, nutre desde raíz a puntas y ayuda al fortalecimiento completo del cabello",
//   "price": 80.52,
//   "sale": false,
//   "sale_price": 0,
//   "stock": 2,
//   "extra_props": {
//     "tamaño": "Mediano"
//   }
// }
