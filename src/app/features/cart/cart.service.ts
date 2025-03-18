import { Injectable, computed, inject, signal } from '@angular/core';
import { ICartItem, ItemCartDto } from '@app/features/cart/cart.types';
import { LocalCartService } from './local-cart.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _localCartService: LocalCartService = inject(LocalCartService);
  private _items = signal<ICartItem[]>([]);

  constructor() {
    this.getCartItems();
  }

  private getCartItems(): void {
    const localItems = this._localCartService.getLocalItems();
    this._items.set(localItems ?? []);
  }

  public items = computed(() => {
    return this._items();
  });

  public itemCount = computed(() => {
    return this._items().reduce((acc, val) => acc + val.quantity, 0);
  });

  public subtotal = computed(() => {
    return this._items().reduce((acc, val) => acc * 1 + val.ammount, 0);
  });

  public addItemToCart(item: ItemCartDto): void {
    const inArray = this._items().some(
      (itemCart) => itemCart.id == item.product_id.toString(),
    );

    if (inArray) {
      this.increaseQuantity(item.product_id.toString());
    } else {
      const newItem: ICartItem = { ...item, id: item.product_id.toString() };
      this._items.set([...this._items(), newItem]);
    }
  }

  public increaseQuantity(itemId: string): void {
    const items = this._items().map((item) => {
      if (item.id != itemId) return item;
      return {
        ...item,
        quantity: item.quantity + 1,
        ammount: (item.quantity + 1) * item.unit_price,
      };
    });
    this._items.set(items);
  }

  public decreaseQuantity(itemId: string): void {
    const index = this._items().findIndex((item) => item.id == itemId);
    const item = this._items()[index];

    if (item.quantity > 1) {
      const items = this._items().map((item) => {
        if (item.id != itemId) return item;
        return {
          ...item,
          quantity: item.quantity - 1,
          ammount: (item.quantity - 1) * item.unit_price,
        };
      });
      this._items.set(items);
    } else {
      this.removeItem(item.id);
    }
  }

  public removeItem(itemId: string): void {
    const newList = this._items().filter((item) => item.id != itemId);
    this._items.set(newList);
  }

  public clearCart(): void {
    this._items.set([]);
  }
}
