import {Injectable} from '@angular/core';
import {ICartItem} from "../interfaces/cart-item";
import {IProduct} from "../interfaces/product";
import Decimal from "decimal.js";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private _cartItems: ICartItem[] = [];

  get cartItems(): ICartItem[] {
    return [...this._cartItems];
  }

  get itemsCount(): number {
    if (this._cartItems.length === 0) return 0;

    const itemsQty = this._cartItems.map(item => item.quantity);
    return itemsQty.reduce((previousValue, currentValue) => previousValue + currentValue);
  }

  get ammount(): number {
    if (this._cartItems.length === 0) return 0;

    const subtotal = this._cartItems.map(item => {
      let price = new Decimal(item.product.price);
      return price.mul(item.quantity);
    })

    const total = subtotal.reduce((previousValue, currentValue) => previousValue.add(currentValue));
    return total.toNumber()
  }

  constructor() {
    this._cartItems = JSON.parse(localStorage.getItem('cartItems')!) || [];
  }

  public addToCart(product: IProduct): void {
    let cartItem: ICartItem = {product, quantity: 1}

    this.addOrIncreaseQty(product, cartItem);

    localStorage.setItem('cartItems', JSON.stringify(this._cartItems));
  }

  private addOrIncreaseQty(product: IProduct, cartItem: ICartItem): void {
    if (this.existThisItem(product.id)) {
      this._cartItems = this._cartItems.map(item => {
        if (item.product.id != product.id) return item;

        item.quantity += 1;
        return item;
      });
    } else {
      this._cartItems.push(cartItem);
    }
  }

  private existThisItem(id: number): boolean {
    return this._cartItems.some(item => item.product.id === id);
  }
}
