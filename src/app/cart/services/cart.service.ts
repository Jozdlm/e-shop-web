import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IShoppingCart } from '../cart';
import { switchMap } from 'rxjs/operators';
import { Firestore, collection, collectionData, doc } from '@angular/fire/firestore';
import { ICartItem } from 'src/app/store/interfaces/cart-item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _http: HttpClient = inject(HttpClient);
  private _apiUrl: string = 'http://localhost:3000';
  private _firestore: Firestore = inject(Firestore);

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

  public getUserShoppingCart(userEmail: string): Observable<ICartItem[]> {
    const cartRef = doc(this._firestore, 'cart', userEmail);
    const cartItemsRef = collection(cartRef, 'items');

    const cartItems$ = collectionData(cartItemsRef, {idField: 'id'})
    return cartItems$ as Observable<ICartItem[]>;
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
