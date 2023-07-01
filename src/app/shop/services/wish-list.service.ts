import { Injectable, signal, effect } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { IWishItem } from '../wish-list';
import { IProduct, ProductOption } from 'src/app/store/interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  public wishItems = signal<IWishItem[]>([]);

  constructor() {}

  public addToWish(product: IProduct, option: ProductOption): void {
    const currItem = this.wishItems().find(
      (i) => i.product_id == product.id && i.type == option.type
    );

    if (currItem) return;

    const wishItem: IWishItem = {
      id: uuid(),
      product_id: product.id,
      description: product.description,
      type: option?.type || product.options[0].type,
      price: option?.price || product.options[0].price,
      img_url: product.img_url,
    };

    this.wishItems.mutate((items) => items.push(wishItem));
  }
}
