import { IProduct } from './product';

export interface ICartItem {
  id: string;
  product: IProduct;
  type: string;
  unit_price: number;
  quantity: number;
  ammount: number;
}
