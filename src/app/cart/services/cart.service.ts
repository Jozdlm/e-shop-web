import { Injectable } from '@angular/core';
import { ICartItem, ItemCartDto } from '../cart';
import { BehaviorSubject, Observable, map, mergeMap, scan } from 'rxjs';

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
    return this.cartItems$.pipe(map((items) => items.length));
  }

  public get subtotal$(): Observable<number> {
    return this.cartItems$.pipe(
      mergeMap((items) => items),
      map((item) => item.quantity * item.unit_price),
      scan((acc, val) => acc + val, 0)
    );
  }

  public addItemToCart(item: ItemCartDto): void {
    const newItem: ICartItem = { ...item, id: item.product_id.toString() };
    this._items = [...this._items, newItem];
    this._cartItems$.next(this._items);
  }

  public increaseQuantity(itemId: string): void {
    const index = this._items.findIndex((item) => item.id == itemId);
    const item = this._items[index];

    const quantity = item.quantity + 1;
    const ammount = quantity * item.unit_price;

    this._items[index] = { ...item, quantity, ammount };
  }

  public decreaseQuantity(itemId: string): void {
    const index = this._items.findIndex((item) => item.id == itemId);
    const item = this._items[index];

    const quantity = item.quantity - 1;
    const ammount = quantity * item.unit_price;

    this._items[index] = {...item, quantity, ammount};
  }

  public removeItem(itemId: string): void {
    this._items = this._items.filter((item) => item.id != itemId);
    this._cartItems$.next(this._items);
  }

  public clearCart(): void {
    this._items = [];
    this._cartItems$.next(this._items);
  }
}
