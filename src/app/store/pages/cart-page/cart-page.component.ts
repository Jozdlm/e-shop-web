import { Component, computed, inject } from '@angular/core';
import {ShoppingCartService} from "../../services/shopping-cart.service";
import { ICartItem } from '../../interfaces/cart-item';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {
  private _shoppingCartService = inject(ShoppingCartService);

  public cartItems = this._shoppingCartService.shoppingCart;
  public cartAmmount = this._shoppingCartService.cartAmmount;

  public shoppingCart = computed<ICartItem[]>(() => {
    return this.cartItems().map((item) => {
      return {...item, subtotal: item.quantity * item.product.price}
    });
  });

  constructor() { }
}
