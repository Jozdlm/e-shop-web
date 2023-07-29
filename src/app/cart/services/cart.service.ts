import { Injectable, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IShoppingCart, ItemCartDto } from '../cart';
import { switchMap } from 'rxjs/operators';
import { Firestore, addDoc, collection, collectionData, doc } from '@angular/fire/firestore';
import { ICartItem } from 'src/app/store/interfaces/cart-item';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _http: HttpClient = inject(HttpClient);
  private _apiUrl: string = 'http://localhost:3000';
  private _firestore: Firestore = inject(Firestore);
  private _authService: AuthService = inject(AuthService);
  private _user = computed<User | null | undefined>(() => this._authService.user());

  constructor() {}

  public getUserShoppingCart(userEmail: string): Observable<ICartItem[]> {
    const cartRef = doc(this._firestore, 'shop-cart', userEmail);
    const cartItemsRef = collection(cartRef, 'items');

    const cartItems$ = collectionData(cartItemsRef, {idField: 'id'})
    return cartItems$ as Observable<ICartItem[]>;
  }

  public addItemToCart(item: ItemCartDto): void {
    if(!this._user()) return;

    const userEmail = this._user()?.email || '';
    const cartRef = doc(this._firestore, 'shop-cart', userEmail);
    const cartItemsRef = collection(cartRef, 'items');

    addDoc(cartItemsRef, item);
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
