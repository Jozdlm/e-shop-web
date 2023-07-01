import { Injectable, signal } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { IWishItem } from '../wish-list';
import { IProduct } from 'src/app/store/interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class WishListService {
  public wishItems = signal<IWishItem[]>([]);

  constructor() { }

  public addToList(product: IProduct): void {
    const wishItem: IWishItem = {
      id: uuid(),
      product_id: product.id,
      description: product.description,
      img_url: product.img_url,
      price: product.price
    }
  }
}
