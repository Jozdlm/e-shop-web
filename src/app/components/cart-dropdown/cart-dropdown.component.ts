import { Component, DestroyRef, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ButtonComponent } from '@app/components/button/button.component';
import { ProductImageDirective } from '@app/directives/product-image.directive';
import { DropdownComponent } from '@app/components/dropdown/dropdown.component';
import { Subscription } from 'rxjs';
import { ShoppingBagIconComponent } from 'src/app/shared/icons/shopping-bag-icon/shopping-bag-icon.component';
import { CartService } from '@app/features/cart/cart.service';
import { AsyncPipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-dropdown',
  templateUrl: './cart-dropdown.component.html',
  imports: [
    CurrencyPipe,
    AsyncPipe,
    RouterLink,
    ButtonComponent,
    ProductImageDirective,
    DropdownComponent,
    ShoppingBagIconComponent,
  ],
})
export class CartDropdownComponent {
  private _cartService: CartService = inject(CartService);
  private _subscription = new Subscription();
  public cartItems$ = this._cartService.cartItems$;
  public cartCount: number = 0;
  public subtotal: number = 0;

  constructor() {
    this.subscribeToObservables();

    inject(DestroyRef).onDestroy(() => {
      this._subscription.unsubscribe();
    });
  }

  public subscribeToObservables(): void {
    this._subscription.add(
      this._cartService.cartCount$.subscribe(
        (value) => (this.cartCount = value),
      ),
    );

    this._subscription.add(
      this._cartService.subtotal$.subscribe((value) => (this.subtotal = value)),
    );
  }
}
