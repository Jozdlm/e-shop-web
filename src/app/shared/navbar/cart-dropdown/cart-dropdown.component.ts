import { Component, OnInit } from '@angular/core';
import {ICartItem} from "../../../store/interfaces/cart-item";
import {ShoppingCartService} from "../../../store/services/shopping-cart.service";

@Component({
  selector: 'app-cart-dropdown',
  templateUrl: './cart-dropdown.component.html',
  styleUrls: ['./cart-dropdown.component.css']
})
export class CartDropdownComponent implements OnInit {
  public showDropdownMenu: boolean = false;

  get cartItems(): ICartItem[] {
    return this.cartService.cartItems;
  }

  get itemsCount(): number {
    return this.cartService.itemsCount;
  }

  get ammount(): number {
    return this.cartService.ammount;
  }

  constructor(private cartService: ShoppingCartService) { }

  ngOnInit(): void {
  }

  public toggleDropdownMenu(): void {
    this.showDropdownMenu = !this.showDropdownMenu;
  }
}
