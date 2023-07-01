import { Injectable, signal } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { IWishItem } from '../wish-list';
import { IProduct } from 'src/app/store/interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  public wishItems = signal<IWishItem[]>([]);

  constructor() {}

  public addToWish(product: IProduct): void {
    const index = this.wishItems().findIndex((i) => i.product_id == product.id);
    if (index >= 0) return;

    const wishItem: IWishItem = {
      id: uuid(),
      product_id: product.id,
      description: product.description,
      price: product.price,
      img_url: product.img_url,
    };

    this.wishItems.mutate((items) => items.push(wishItem));
  }
}
