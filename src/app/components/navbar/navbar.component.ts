import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BUSINESS_NAME } from '@app/constants';
import { SvgIconComponent } from 'angular-svg-icon';
import { CartService } from '@app/features/cart/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [RouterModule, SvgIconComponent],
})
export class NavbarComponent {
  private _cartService: CartService = inject(CartService);
  public businessName: string = BUSINESS_NAME;
  public cartCount: number = 0;

  public constructor() {
    this._cartService.cartCount$.subscribe((value) => (this.cartCount = value));
  }
}
