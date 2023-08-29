import { OrderSummaryComponent } from './../../components/order-summary/order-summary.component';
import { Component, inject } from '@angular/core';
import { ShoppingCartService } from 'src/app/cart/services/shopping-cart.service';
import { CommonModule } from '@angular/common';
import { ItemCartComponent } from '../../components/item-cart/item-cart.component';
import { ButtonComponent } from 'src/app/common/components/button/button.component';
import { RouterModule } from '@angular/router';
import { EmptyCartComponent } from '../../components/empty-cart/empty-cart.component';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ItemCartComponent,
    ButtonComponent,
    RouterModule,
    OrderSummaryComponent,
    EmptyCartComponent
  ],
})
export class CartPageComponent {
  private _cartService: ShoppingCartService = inject(ShoppingCartService);

  public cart = this._cartService.shoppingCart;

  constructor() {}

  public clearShoppingCart(): void {
    this._cartService.clearShoppingCart();
  }
}
