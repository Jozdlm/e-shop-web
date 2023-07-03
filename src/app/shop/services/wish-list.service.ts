import { Injectable, signal, computed, inject, effect } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { IWishItem, IWishList } from '../wish-list';
import { IProduct, ProductOption } from 'src/app/store/interfaces/product';
import { HttpClient } from '@angular/common/http';
import {Observable, switchMap} from 'rxjs';
import { environment } from '../../../environments/environment';
import {AuthService} from "../../auth/services/auth.service";

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  private _http: HttpClient = inject(HttpClient);
  private _apiUrl: string = environment.apiUrl;
  private _authService: AuthService = inject(AuthService);
  private _wishItems = signal<IWishItem[]>([]);

  public wishList = computed<IWishList>(() => ({
    id: '1',
    items: this._wishItems(),
    count: this._wishItems().length
  }));

  constructor() {
    this.getWishById(this.wishList().id).subscribe({
      next: (wishList) => this._wishItems.set(wishList.items),
      error: (_) => this._wishItems.set([])
    });

    effect(() => {
      this.saveWishList(this.wishList()).subscribe();
    })
  }

  public saveWishList(wishList: IWishList): Observable<IWishList> {
    const wishId: string = wishList.id;
    return this.getWishById(wishId)
      .pipe(
        switchMap(list => {
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

  public addToWish(product: IProduct, option: ProductOption): void {
    const currItem = this._wishItems().find(
      (i) => i.product_id == product.id && i.type == option.type
    );

    if (currItem) return;

    const wishItem: IWishItem = {
      id: uuid(),
      product_id: product.id,
      name: product.name,
      description: product.description,
      type: option?.type || product.options[0].type,
      price: option?.price || product.options[0].price,
      img_url: product.img_url,
    };

    this._wishItems.mutate((items) => items.push(wishItem));
  }

  public removeFromWish(itemId: string): void {
    this._wishItems.update((items) => {
      return items.filter(i => i.id !== itemId);
    });
  }

  public clearWishList(): void {
    this._wishItems.set([]);
  }
}
