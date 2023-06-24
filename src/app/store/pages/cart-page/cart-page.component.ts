import { Component, computed, inject } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ICartItem } from '../../interfaces/cart-item';
import { CommonModule } from '@angular/common';
import { ItemCartComponent } from '../../components/item-cart/item-cart.component';
import { ButtonComponent } from 'src/app/common/components/button/button.component';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  standalone: true,
  imports: [CommonModule, ItemCartComponent, ButtonComponent],
})
export class CartPageComponent {
  private _cartService = inject(ShoppingCartService);

  public cartItems = this._cartService.cartItems;
  public subtotal = this._cartService.subtotal;
  public shipping = this._cartService.shipping;
  public tax = this._cartService.tax;
  public total = this._cartService.total;

  public shoppingCart = computed<ICartItem[]>(() => {
    return this.cartItems().map((item) => {
      return { ...item, subtotal: item.quantity * item.unit_price };
    });
  });

  constructor() {}

  public clearShoppingCart(): void {
    this._cartService.clearShoppingCart();
  }
}
