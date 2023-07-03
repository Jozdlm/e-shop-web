import { ICartItem } from '../store/interfaces/cart-item';

export interface IShoppingCart {
  id?: string;
  items: ICartItem[];
  units_count: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export interface IAddItemCart {
  product_id: number;
  name: string;
  img_url: string;
  type: string;
  unit_price: number;
}
