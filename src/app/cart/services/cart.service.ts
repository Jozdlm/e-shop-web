import { Injectable } from '@angular/core';
import { ICartItem, ItemCartDto } from '../cart';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _items: ICartItem[] = [];
  private _cartItems$ = new BehaviorSubject<ICartItem[]>(this._items);

  constructor() {}

  public get cartItems$(): Observable<ICartItem[]> {
    return this._cartItems$.asObservable();
  }

  public get cartCount$(): Observable<number> {
    return this.cartItems$.pipe(
      map((items) => items.length)
    );
  }

  public addItemToCart(item: ItemCartDto): void {
    const newItem: ICartItem = { ...item, id: item.product_id.toString() };
    this._items = [...this._items, newItem];
    this._cartItems$.next(this._items);
  }
}
