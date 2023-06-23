import {IProduct} from "./product";

export interface ICartItem {
  product: IProduct;
  type: string;
  unit_price: number;
  quantity: number;
  subtotal?: number;
}
