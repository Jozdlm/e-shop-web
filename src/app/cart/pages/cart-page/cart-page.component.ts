import { OrderSummaryComponent } from './../../components/order-summary/order-summary.component';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemCartComponent } from '../../components/item-cart/item-cart.component';
import { ButtonComponent } from 'src/app/common/components/button/button.component';
import { RouterModule } from '@angular/router';
import { EmptyCartComponent } from '../../components/empty-cart/empty-cart.component';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';

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
    EmptyCartComponent,
  ],
})
export class CartPageComponent {
  private _cartService: CartService = inject(CartService);
  private _subscription = new Subscription();
  public items = this._cartService.cartItems$;
  public itemsCount: number = 0;

  constructor() {
    this.subscribeToObservables();
  }

  public subscribeToObservables(): void {
    this._subscription.add(
      this._cartService.cartCount$.subscribe((value) => (this.itemsCount = value))
    );
  }

  public clearShoppingCart(): void {
    // this._cartService.clearShoppingCart();
  }
}
