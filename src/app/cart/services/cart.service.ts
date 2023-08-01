import { Injectable, computed, inject } from '@angular/core';
import { ItemCartDto } from '../cart';
import { Firestore, addDoc, collection, collectionData, doc } from '@angular/fire/firestore';
import { ICartItem } from 'src/app/store/interfaces/cart-item';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class CartService {
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
}
