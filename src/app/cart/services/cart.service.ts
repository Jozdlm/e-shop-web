import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IShoppingCart } from '../cart';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _http: HttpClient = inject(HttpClient);
  private _apiUrl: string = 'http://localhost:3000';

  constructor() {}

  public saveShoppingCart(cart: IShoppingCart) {
    return this.getCartById(cart.id!).pipe(
      switchMap((cart) => {
        if (cart.id) {
          return this.updateCart(cart);
        } else {
          return this.createCart(cart);
        }
      })
    );
  }

  public getCartById(cartId: string) {
    return this._http.get<IShoppingCart>(`${this._apiUrl}/my_cart/${cartId}`);
  }

  public createCart(cart: IShoppingCart) {
    return this._http.post<IShoppingCart>(`${this._apiUrl}/my_cart`, cart);
  }

  public updateCart(cart: IShoppingCart) {
    return this._http.put<IShoppingCart>(
      `${this._apiUrl}/my_cart/${cart.id}`,
      cart
    );
  }
}
