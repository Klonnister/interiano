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
