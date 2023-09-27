import { OrderSummaryComponent } from './../../components/order-summary/order-summary.component';
import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemCartComponent } from '../../components/item-cart/item-cart.component';
import { ButtonComponent } from 'src/app/common/components/button/button.component';
import { RouterModule } from '@angular/router';
import { EmptyCartComponent } from '../../components/empty-cart/empty-cart.component';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

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
  private _authService: AuthService = inject(AuthService);
  private _subscription = new Subscription();
  public items = this._cartService.cartItems$;
  public itemsCount: number = 0;
  public subtotal: number = 0;
  public tax: number = 0;

  constructor() {
    this.subscribeToObservables();

    inject(DestroyRef).onDestroy(() => {
      this._subscription.unsubscribe();
    });
  }

  public get isSession(): boolean {
    return this._authService.session ? true : false;
  }

  public subscribeToObservables(): void {
    this._subscription.add(
      this._cartService.cartCount$.subscribe(
        (value) => (this.itemsCount = value)
      )
    );
    this._subscription.add(
      this._cartService.subtotal$.subscribe((value) => (this.subtotal = value))
    );
    this._subscription.add(
      this._cartService.tax$.subscribe((value) => (this.tax = value))
    );
  }

  public clearShoppingCart(): void {
    this._cartService.clearCart();
  }

  public handleIncrease(itemId: string): void {
    this._cartService.increaseQuantity(itemId);
  }

  public handleDecrease(itemId: string): void {
    this._cartService.decreaseQuantity(itemId);
  }

  public handleDeleteItem(itemId: string): void {
    this._cartService.removeItem(itemId);
  }
}
