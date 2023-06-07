import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {ICartItem} from "../../interfaces/cart-item";

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  public cartItems: ICartItem[] = [];

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.cartItems = this.shoppingCartService.cartItems;
  }

}
