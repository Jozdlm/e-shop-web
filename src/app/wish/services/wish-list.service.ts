import { Injectable, signal, computed, inject, effect } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { IWishItem, IWishList } from '../wish-list';
import { IProduct } from 'src/app/store/interfaces/product';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest, map, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ShoppingCartService } from '../../store/services/shopping-cart.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Firestore, collection, collectionData, doc, docData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  private _http: HttpClient = inject(HttpClient);
  private _apiUrl: string = environment.apiUrl;
  private _cartService: ShoppingCartService = inject(ShoppingCartService);
  private _wishItems = signal<IWishItem[]>([]);
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

  public saveWishList(wishList: IWishList): Observable<IWishList> {
    const wishId: string = wishList.id;
    return this.getWishById(wishId).pipe(
      switchMap((list) => {
        if (!list.id) {
          return this.createWishList(wishList);
        } else {
          return this.updateWishList(list.id, wishList);
        }
      })
    );
  }

  public getWishById(wishId: string): Observable<IWishList> {
    return this._http.get<IWishList>(`${this._apiUrl}/my_wishlist/${wishId}`);
  }

  public createWishList(wishList: IWishList): Observable<IWishList> {
    return this._http.post<IWishList>(`${this._apiUrl}/my_wishlist`, wishList);
  }

  public updateWishList(wishId: string, wishList: IWishList): Observable<IWishList> {
    return this._http.put<IWishList>(`${this._apiUrl}/my_wishlist/${wishId}`, wishList);
  }

  public addToWish(product: IProduct): void {
    const currItem = this._wishItems().find(
      (i) => i.product_id == product.id
    );

    if (currItem) return;

    const wishItem: IWishItem = {
      id: uuid(),
      product_id: product.id,
      name: product.name,
      price: product.price,
      img_url: product.img_url,
    };

    this._wishItems.mutate((items) => items.push(wishItem));
  }

  public moveToCart(item: IWishItem): void {
    this._cartService.addToCart({
      product_id: item.product_id,
      name: item.name,
      img_url: item.img_url,
      unit_price: item.price,
    });

    this.removeFromWish(item.id);
  }

  public removeFromWish(itemId: string): void {
    this._wishItems.update((items) => {
      return items.filter((i) => i.id !== itemId);
    });
  }

  public clearWishList(): void {
    this._wishItems.set([]);
  }
}
