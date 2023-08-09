import { Injectable, signal, computed, inject, effect } from '@angular/core';
import { IWishItem, IWishList, WishItemDto } from '../wish-list';
import { IProduct } from 'src/app/shop/product';
import { combineLatest, map } from 'rxjs';
import { ShoppingCartService } from 'src/app/cart/services/shopping-cart.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  private _cartService: ShoppingCartService = inject(ShoppingCartService);
  private _authService: AuthService = inject(AuthService);
  private _firestore: Firestore = inject(Firestore);
  private _wish = signal<IWishList>({
    id: '',
    items: [],
    count: 0
  })

  public wishList = computed<IWishList>(() => this._wish());

  constructor() {
    effect(() => {
      if (this._authService.user()) {
        const userEmail = this._authService.user()?.email || '';
        this.getUserWishList(userEmail);
      }
    });
  }

  public getUserWishList(userEmail: string): void {
    const wishRef = doc(this._firestore, 'wish-list', userEmail);
    const wishItemsRef = collection(wishRef, 'items');

    const wish$ = docData(wishRef, {idField: 'id'});
    const wishItems$ = collectionData(wishItemsRef, {idField: 'id'});

    combineLatest([wish$, wishItems$])
      .pipe(
        map(([wishInfo, wishItems]) => {
          const wish = {...wishInfo, count: wishItems.length, items: wishItems};
          return wish as IWishList;
        })
      )
    .subscribe({
      next: (value) => this._wish.set(value),
      error: (error) => console.log(error)
    });
  }

  public addToWish(product: IProduct): void {
    const currItem = this._wish().items.find(
      (i) => i.product_id == product.id
    );

    if (currItem) return;

    const wishItem: WishItemDto = {
      product_id: product.id,
      name: product.name,
      price: product.price,
      img_url: product.img_url,
    };

    const userEmail = this._authService.user()?.email || '';
    const docRef = doc(this._firestore, 'wish-list', userEmail);
    const itemsRef = collection(docRef, 'items');

    addDoc(itemsRef, wishItem);
  }

  public moveToCart(item: IWishItem): void {
    this._cartService.addToCart({
      product_id: item.product_id,
      name: item.name,
      img_url: item.img_url,
      unit_price: item.price,
      quantity: 1,
      ammount: item.price
    });

    this.removeFromWish(item.id);
  }

  public removeFromWish(itemId: string): void {
    const userEmail = this._authService.user()?.email || '';
    const docRef = doc(this._firestore, 'wish-list', userEmail);

    const itemRef = doc(docRef, 'items', itemId);
    deleteDoc(itemRef);
  }

  public clearWishList(): void {
    this._wish().items.forEach(item => this.removeFromWish(item.id));
  }
}
