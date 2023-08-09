import { OrderSummaryComponent } from './../../components/order-summary/order-summary.component';
import { Component, inject } from '@angular/core';
import { ShoppingCartService } from 'src/app/cart/services/shopping-cart.service';
import { CommonModule } from '@angular/common';
import { ItemCartComponent } from '../../components/item-cart/item-cart.component';
import { ButtonComponent } from 'src/app/common/components/button/button.component';
import { RouterModule } from '@angular/router';
import { WishListService } from '../../../wish/services/wish-list.service';
import { WishCartComponent } from '../../components/wish-cart/wish-cart.component';
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
    WishCartComponent,
    OrderSummaryComponent,
    EmptyCartComponent
  ],
})
export class CartPageComponent {
  private _cartService: ShoppingCartService = inject(ShoppingCartService);
  private _wishService: WishListService = inject(WishListService);

  public cart = this._cartService.shoppingCart;
  public wish = this._wishService.wishList;

  constructor() {}

  public clearShoppingCart(): void {
    this._cartService.clearShoppingCart();
  }
}
