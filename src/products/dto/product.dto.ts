export interface createProductDTO {
  category_id: number;
  trademark_id: number;
  name: string;
  line?: string;
  components?: string;
  size?: string;
  description?: string;
  extra_props?: object;
  quantity: number;
  price: number;
}

export interface updateProductDTO {
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
//   "name": "Shampoo Pantene Anticaída",
//   "images": "/123456.jpeg",
//   "line": "Hidratación y fortalecimiento",
//   "components": "Coco & Pepino",
//   "size": "650 ml",
//   "description": "El mejor shampoo para cabello dañado, nutre desde raíz a puntas y ayuda al fortalecimiento completo del cabello",
//   "extra_props": {
//     "tamaño": "Mediano"
//   },
//   "quantity": 2,
//   "price": 80.52
// }
