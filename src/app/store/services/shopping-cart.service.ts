import {computed, effect, Injectable, signal} from '@angular/core';
import {ICartItem} from "../interfaces/cart-item";
import {IProduct} from "../interfaces/product";
import Decimal from "decimal.js";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  public shoppingCart = signal<ICartItem[]>([]);

  public cartUnits = computed<number>(() => {
    let units = this.shoppingCart().map(item => item.quantity);
    return units.reduce((previous, current) => previous + current, 0);
  });

  public cartAmmount = computed<number>(() => {
    const prices = this.shoppingCart().map(item => {
      let unitPrice = new Decimal(item.product.price);
      return unitPrice.mul(item.quantity);
    });

    const total = prices.reduce((previous, current) => previous.add(current), new Decimal(0));
    return total.toNumber();
  });

  public tax = computed<number>(() => {
    return this.cartAmmount() * 0.12;
  });

  constructor() {
    this.shoppingCart.set(JSON.parse(localStorage.getItem('cartItems')!) || []);

    effect(() => {
      localStorage.setItem('cartItems', JSON.stringify(this.shoppingCart()));
    });
  }

  public addToCart(product: IProduct): void {
    const index = this.shoppingCart().findIndex(item => item.product.id == product.id);

    if (index === -1) {
      this.shoppingCart.mutate(value => {
        value.push({ product, quantity: 1 });
      });
    } else {
      this.shoppingCart.mutate(items => {
        items[index] = { product, quantity: items[index].quantity + 1 };
      })
    }
  }

  public decreaseQuantity(productId: number, currentQty: number) {
    if(currentQty > 1) {
      const index = this.shoppingCart().findIndex(item => item.product.id == productId);

      this.shoppingCart.mutate(items => {
        items[index] = { ...items[index], quantity: items[index].quantity - 1 };
      });
    } else {
      this.removeFromCart(productId);
    }
  }

  public removeFromCart(productId: number): void {
    this.shoppingCart.update(value => {
      return value.filter(item => item.product.id != productId);
    });
  }

  public clearShoppingCart(): void {
    this.shoppingCart.set([]);
  }
}
