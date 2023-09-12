import { Injectable } from '@angular/core';
import { ICartItem, ItemCartDto } from '../cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _cartItems: ICartItem[] = [];

  constructor() {}

  public get cartItems(): ICartItem[] {
    return [...this._cartItems];
  }

  public addItemToCart(item: ItemCartDto): void {
    const newItem: ICartItem = { ...item, id: item.product_id.toString() };
    this._cartItems.push(newItem);
  }
}
