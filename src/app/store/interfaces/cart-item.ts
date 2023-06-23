import {IProduct} from "./product";

export interface ICartItem {
  product: IProduct;
  unit_price: number;
  quantity: number;
  subtotal?: number;
}
