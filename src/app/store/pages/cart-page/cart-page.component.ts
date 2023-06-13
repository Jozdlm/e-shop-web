import { Component, computed, inject } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ICartItem } from '../../interfaces/cart-item';
import { IProduct } from '../../interfaces/product';
import { NgIf, NgFor, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
  standalone: true,
  imports: [NgIf, NgFor, CurrencyPipe],
})
export class CartPageComponent {
  private _shoppingCartService = inject(ShoppingCartService);

  public cartItems = this._shoppingCartService.shoppingCart;
  public cartAmmount = this._shoppingCartService.cartAmmount;

  public shoppingCart = computed<ICartItem[]>(() => {
    return this.cartItems().map((item) => {
      return { ...item, subtotal: item.quantity * item.product.price };
    });
  });

  constructor() {}

  public increaseQty(product: IProduct): void {
    this._shoppingCartService.addToCart(product);
  }

  public decreaseQty(cartItem: ICartItem): void {
    const { product, quantity } = cartItem;
    this._shoppingCartService.decreaseQuantity(product.id, quantity);
  }

  public removeFromCart(productId: number): void {
    this._shoppingCartService.removeFromCart(productId);
  }
}
