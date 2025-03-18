import { Component, DestroyRef, inject } from '@angular/core';
import { ItemCartComponent } from '../components/item-cart/item-cart.component';
import { RouterModule } from '@angular/router';
import { EmptyCartComponent } from '../components/empty-cart/empty-cart.component';
import { Subscription } from 'rxjs';
import { CartService } from '@app/features/cart/cart.service';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-cart-page',
  imports: [
    AsyncPipe,
    ItemCartComponent,
    RouterModule,
    EmptyCartComponent,
    CurrencyPipe,
    SvgIconComponent,
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
        <div>
          <div class="mb-6 border-b border-gray-300 pb-4">
            <p class="mb-2 text-lg">Subtotal:</p>
            <p class="text-2xl font-medium">{{ subtotal | currency: 'GTQ' }}</p>
          </div>

          <button
            routerLink="/checkout"
            class="flex w-full items-center justify-center gap-x-2 rounded-md border px-2 py-2.5 text-sm font-medium text-neutral-800 hover:border-neutral-400"
          >
            <p>Hacer pedido</p>
            <svg-icon src="assets/svg/clipboard-doc.svg" class="icon-md" />
          </button>
        </div>
      </div>
    } @else {
      <app-empty-cart />
    }
  `,
})
export class CartPage {
  private _cartService: CartService = inject(CartService);
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
}
