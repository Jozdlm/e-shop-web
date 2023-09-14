import { Injectable } from '@angular/core';
import { ICartItem, ItemCartDto } from '../cart';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _cartItems: ICartItem[] = [];
  private _cartItems$ = new BehaviorSubject<ICartItem[]>(this._cartItems);

  constructor() {}

  public get cartItems(): Observable<ICartItem[]> {
    return this._cartItems$.asObservable();
  }

  public addItemToCart(item: ItemCartDto): void {
    const newItem: ICartItem = { ...item, id: item.product_id.toString() };
    this._cartItems.push(newItem);
  }
}
