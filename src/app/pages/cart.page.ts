import { OrderSummaryComponent } from '../cart/components/order-summary/order-summary.component';
import { Component, DestroyRef, inject } from '@angular/core';
import { ItemCartComponent } from '../cart/components/item-cart/item-cart.component';
import { RouterModule } from '@angular/router';
import { EmptyCartComponent } from '../cart/components/empty-cart/empty-cart.component';
import { Subscription } from 'rxjs';
import { CartService } from '@app/cart/cart.service';
import { AuthService } from '@app/auth/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-cart-page',
  imports: [
    AsyncPipe,
    ItemCartComponent,
    RouterModule,
    OrderSummaryComponent,
    EmptyCartComponent,
  ],
  template: `
    @if (itemsCount) {
      <div class="mb-10">
        <h1 class="mb-1 text-xl font-medium">Mi carrito</h1>
        <a
          class="cursor-pointer text-sm text-gray-700 underline"
          (click)="clearShoppingCart()"
          >Limpiar carrito</a
        >
      </div>
      <div class="grid grid-cols-[2fr_1fr] gap-x-20">
        <div class="pb-4">
          @for (item of items | async; track item.id) {
            <app-item-cart
              [cartItem]="item"
              (onIncreaseQty)="handleIncrease($event)"
              (onDecreaseQty)="handleDecrease($event)"
              (onDeleteItem)="handleDeleteItem($event)"
            />
          }
        </div>
        <app-order-summary
          [subtotal]="subtotal"
          [session]="isSession"
          (onNoSessionClick)="handleNoSessionClick()"
        />
      </div>
    } @else {
      <app-empty-cart />
    }
  `,
})
export class CartPage {
  private _cartService: CartService = inject(CartService);
  private _authService: AuthService = inject(AuthService);
  private _subscription = new Subscription();
  public items = this._cartService.cartItems$;
  public itemsCount: number = 0;
  public subtotal: number = 0;

  public constructor() {
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
        (value) => (this.itemsCount = value),
      ),
    );

    this._subscription.add(
      this._cartService.subtotal$.subscribe((value) => (this.subtotal = value)),
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

  public handleNoSessionClick(): void {
    this._authService.previousRoute = '/cart';
  }
}
