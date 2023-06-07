import { Component, inject } from '@angular/core';
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {ICartItem} from "../../interfaces/cart-item";

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {
  private _shoppingCartService = inject(ShoppingCartService);

  public cartItems: ICartItem[] = this._shoppingCartService.shoppingCart();

  constructor() { }
}
