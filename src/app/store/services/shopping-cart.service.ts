import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { ICartItem } from '../interfaces/cart-item';
import { IAddItemCart, IShoppingCart } from '../../cart/cart';
import { v4 as uuid } from 'uuid';
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
      const userId = this._authService.user()?.uid;
      this.getCartFromDB(userId);
    })

    effect(() => {
      const cart = this.shoppingCart();
      this._cartService.saveShoppingCart(cart).subscribe();
    });
  }

  public getCartFromDB(userId: string | undefined): void {
    if(!userId) {
      JSON.stringify(localStorage.getItem('cart') || []);

      this.cartItems.set([]);
    } else {
      this._cartService.getCartById(userId).subscribe({
        next: (cart) => this.cartItems.set(cart.items),
        error: (_) => this.cartItems.set([]),
      });
    }
  }

  public addToCart(addItemCart: IAddItemCart): void {
    const carItem = this.cartItems().find(
      (item) => item.product_id == addItemCart.product_id
    );

    const newItem: ICartItem = {
      id: uuid(),
      ...addItemCart,
      quantity: 1,
      ammount: addItemCart.unit_price,
    };

    if (carItem) {
      this.increaseQuantity(carItem.id);
    } else {
      this.cartItems.mutate((value) => {
        value.push(newItem);
      });
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
