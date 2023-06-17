export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  img_url: string;
  options: Option[]
}

export interface Option {
  type: string;
  price: number;
  in_stock: boolean;
}
