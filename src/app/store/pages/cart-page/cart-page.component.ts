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
  public cart = this._cartService.shoppingCart;

  constructor() {}

  public clearShoppingCart(): void {
    this._cartService.clearShoppingCart();
  }
}
