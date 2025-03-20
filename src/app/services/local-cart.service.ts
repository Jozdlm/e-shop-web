import { Injectable } from '@angular/core';
import { ICartItem } from '../types/cart.types';

@Injectable({
  providedIn: 'root',
})
export class LocalCartService {
  constructor() {}

  public getLocalItems(): ICartItem[] | null {
    const localJSON = localStorage.getItem('cart-items');

    if (!localJSON) return null;
    return JSON.parse(localJSON) as ICartItem[];
  }

  public setLocalItems(items: ICartItem[]): void {
    localStorage.setItem('cart-items', JSON.stringify(items));
  }
}
