import { ICartItem } from './cart-item';

export interface IShoppingCart {
  items: ICartItem[];
  units_count: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}
