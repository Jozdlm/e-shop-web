export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  img_url: string;
  in_stock: boolean;
  options: ProductOption[]
}

export interface ProductOption {
  type: string;
  price: number;
  in_stock: boolean;
}
