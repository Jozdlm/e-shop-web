import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { ICartItem } from 'src/app/cart/cart';
import { IShoppingCart, ItemCartDto } from '../../cart/cart';
import { CartService } from 'src/app/cart/services/cart.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private _cartService: CartService = inject(CartService);
  private _authService: AuthService = inject(AuthService);

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

  constructor() {
    effect(() => {
      if(this._authService.user()) {
        const userEmail = this._authService.user()?.email || '';
        this._cartService.getUserShoppingCart(userEmail)
          .subscribe({
            next: (value) => this.cartItems.set(value)
          });
      }
    })
  }

  public addToCart(itemCart: ItemCartDto): void {
    const carItem = this.cartItems().find(
      (item) => item.product_id == itemCart.product_id
    );

    if (carItem) {
      this.increaseQuantity(carItem.id);
    } else {
      this._cartService.addItemToCart(itemCart);
    }
  }

  public increaseQuantity(itemId: string): void {
    const index = this.cartItems().findIndex((item) => item.id == itemId);

    this.cartItems.mutate((items) => {
      const quantity = items[index].quantity + 1;
      const ammount = quantity * items[index].unit_price;

      items[index] = { ...items[index], quantity, ammount };
    });
  }

  public decreaseQuantity(itemId: string) {
    const cartItem = this.cartItems().find((item) => item.id == itemId);

    if (cartItem!.quantity > 1) {
      const index = this.cartItems().findIndex((item) => item.id == itemId);

      this.cartItems.mutate((items) => {
        items[index] = { ...items[index], quantity: items[index].quantity - 1 };
      });
    } else {
      this.removeFromCart(cartItem!.id);
    }
  }

  public removeFromCart(itemId: string): void {
    this.cartItems.update((value) => {
      return value.filter((item) => item.id != itemId);
    });
  }

  public clearShoppingCart(): void {
    this.cartItems.set([]);
  }
}
