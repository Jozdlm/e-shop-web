import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IShoppingCart } from '../cart';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _http: HttpClient = inject(HttpClient);
  private _apiUrl: string = 'http://localhost:3000';

  constructor() {}

  public saveShoppingCart(cart: IShoppingCart, userId: string) {
    return this.getCartById(userId).pipe(
      switchMap(({id: cartId}) => {
        if (cartId) {
          return this.updateCart(cartId, cart);
        } else {
          return this.createCart(userId, cart);
        }
      })
    );
  }

  public getCartById(cartId: string) {
    return this._http.get<IShoppingCart>(`${this._apiUrl}/my_cart/${cartId}`);
  }

  public createCart(userId: string, cart: IShoppingCart) {
    cart = {...cart, id: userId};
    return this._http.post<IShoppingCart>(`${this._apiUrl}/my_cart`, cart);
  }

  public updateCart(cartId: string, cart: IShoppingCart) {
    return this._http.put<IShoppingCart>(
      `${this._apiUrl}/my_cart/${cartId}`,
      cart
    );
  }
}
