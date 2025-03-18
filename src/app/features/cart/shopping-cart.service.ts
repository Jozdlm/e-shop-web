import { computed, inject, Injectable, signal } from '@angular/core';
import { ICartItem } from '@app/features/cart/cart.types';
import { IShoppingCart, ItemCartDto } from '@app/features/cart/cart.types';
import { CartService } from '@app/features/cart/cart.service';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private _cartService: CartService = inject(CartService);

  public shoppingCart = computed<IShoppingCart>(() => ({
    items: this.cartItems(),
    units_count: this.cartUnits(),
    subtotal: this.subtotal(),
    shipping: this.shipping(),
    tax: this.tax(),
    total: this.total(),
  }));

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

  public shipping = computed<number>(() => (this.subtotal() >= 250 ? 0 : 50));

  public tax = computed<number>(() => {
    return this.subtotal() * 0.12;
  });

  public total = computed<number>(() => {
    return this.subtotal() + this.tax();
  });

  constructor() {}

  public addToCart(itemCart: ItemCartDto): void {
    const carItem = this.cartItems().find(
      (item) => item.product_id == itemCart.product_id,
    );

    if (carItem) {
      this.increaseQuantity(carItem.id);
    } else {
      this._cartService.addItemToCart(itemCart);
    }
  }

  public increaseQuantity(itemId: string): void {
    const index = this.cartItems().findIndex((item) => item.id == itemId);

    this.cartItems.update((items) => {
      const quantity = items[index].quantity + 1;
      const ammount = quantity * items[index].unit_price;

      const newCart = [...items];
      newCart[index] = { ...items[index], quantity, ammount };
      return newCart;
    });
  }

  public decreaseQuantity(itemId: string) {
    const cartItem = this.cartItems().find((item) => item.id == itemId);

    if (cartItem!.quantity > 1) {
      const index = this.cartItems().findIndex((item) => item.id == itemId);

      this.cartItems.update((items) => {
        const newCart = [...items];
        newCart[index] = {
          ...items[index],
          quantity: items[index].quantity - 1,
        };
        return newCart;
      });
    } else {
      // this.removeFromCart(cartItem!.id);
    }
  }
}
