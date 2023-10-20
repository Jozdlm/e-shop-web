export interface IProduct {
  id: number;
  name: string;
  description: string;
  selling_price: number;
  img_url: string;
  in_stock: boolean;
  category?: Category;
}

export type Category = {
  id: number;
  name: string;
  description: string;
}
