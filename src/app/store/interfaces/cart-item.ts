export interface ICartItem {
  id: string;
  product: {
    id: number;
    name: string;
    img_url: string;
  }
  type: string;
  unit_price: number;
  quantity: number;
  ammount: number;
}
