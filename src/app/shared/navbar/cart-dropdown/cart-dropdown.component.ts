import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ShoppingCartService } from "../../../store/services/shopping-cart.service";

@Component({
  selector: 'app-cart-dropdown',
  templateUrl: './cart-dropdown.component.html',
  styleUrls: ['./cart-dropdown.component.css']
})
export class CartDropdownComponent implements OnInit {
  public showDropdownMenu: boolean = false;

  public cartItems = this._shoppingCartService.shoppingCart;
  public cartUnits = this._shoppingCartService.cartUnits;
  public cartAmmount = this._shoppingCartService.cartAmmount;

  constructor(private _shoppingCartService: ShoppingCartService, private elementRef: ElementRef) { }

  ngOnInit(): void {
  }

  public toggleDropdownMenu(): void {
    this.showDropdownMenu = !this.showDropdownMenu;
  }

  public clearShoppingCart(): void {
    this._shoppingCartService.clearShoppingCart();
  }

  @HostListener('document:click', ['$event'])
  public clickedOut(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showDropdownMenu = false;
    }
  }
}
