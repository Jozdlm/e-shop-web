import { computed, effect, Injectable, signal } from '@angular/core';
import { ICartItem } from '../interfaces/cart-item';
import { IProduct, ProductOption } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  public cartItems = signal<ICartItem[]>([]);

  public cartUnits = computed<number>(() => {
    let units = this.cartItems().map((item) => item.quantity);
    return units.reduce((previous, current) => previous + current, 0);
  });

  public subtotal = computed<number>(() => {
    const prices = this.cartItems().map((item) => {
      return item.unit_price * item.quantity;
    });

    return prices.reduce((previous, current) => previous + current, 0);
  });

  public shipping = computed<number>(() => (this.subtotal() >= 250) ? 0 : 50);

  public tax = computed<number>(() => {
    return this.subtotal() * 0.12;
  });

  public total = computed<number>(() => {
    return this.subtotal() + this.tax();
  });

  constructor() {
    this.cartItems.set(JSON.parse(localStorage.getItem('cartItems')!) || []);

    effect(() => {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems()));
    });
  }

  public addToCart(product: IProduct, option?: ProductOption): void {
    const index = this.cartItems().findIndex(
      (item) => item.product.id == product.id
    );

    const newItem: ICartItem = {
      product,
      type: option?.type || product.options[0].type,
      quantity: 1,
      unit_price: option?.price || product.options[0].price,
    };

    if (index === -1) {
      this.cartItems.mutate((value) => {
        value.push(newItem);
      });
    } else {
      this.increaseQuantity(product.id);
    }
  }

  public increaseQuantity(productId: number): void {
    const index = this.cartItems().findIndex(
      (item) => item.product.id == productId
    );

    this.cartItems.mutate((items) => {
      items[index] = { ...items[index], quantity: items[index].quantity + 1 };
    });
  }

  public decreaseQuantity(productId: number) {
    const cartItem = this.cartItems().find(item => item.product.id == productId);

    if (cartItem!.quantity > 1) {
      const index = this.cartItems().findIndex(
        (item) => item.product.id == productId
      );

      this.cartItems.mutate((items) => {
        items[index] = { ...items[index], quantity: items[index].quantity - 1 };
      });
    } else {
      this.removeFromCart(productId);
    }
  }

  public removeFromCart(productId: number): void {
    this.cartItems.update((value) => {
      return value.filter((item) => item.product.id != productId);
    });
  }

  public clearShoppingCart(): void {
    this.cartItems.set([]);
  }
}
