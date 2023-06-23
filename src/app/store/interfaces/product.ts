export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  img_url: string;
  options: ProductOption[]
}

export interface ProductOption {
  type: string;
  price: number;
  in_stock: boolean;
}
