import {Component, ElementRef, HostListener, inject, OnInit} from '@angular/core';
import {ICartItem} from "../../../store/interfaces/cart-item";
import {ShoppingCartService} from "../../../store/services/shopping-cart.service";

@Component({
  selector: 'app-cart-dropdown',
  templateUrl: './cart-dropdown.component.html',
  styleUrls: ['./cart-dropdown.component.css']
})
export class CartDropdownComponent implements OnInit {
  public showDropdownMenu: boolean = false;

  public cartItems: ICartItem[] = this._shoppingCartService.shoppingCart();

  get itemsCount(): number {
    return this._shoppingCartService.itemsCount;
  }

  get ammount(): number {
    return this._shoppingCartService.ammount;
  }

  constructor(private _shoppingCartService: ShoppingCartService, private elementRef: ElementRef) { }

  ngOnInit(): void {
  }

  public toggleDropdownMenu(): void {
    this.showDropdownMenu = !this.showDropdownMenu;
  }

  @HostListener('document:click', ['$event'])
  public clickedOut(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showDropdownMenu = false;
    }
  }
}
