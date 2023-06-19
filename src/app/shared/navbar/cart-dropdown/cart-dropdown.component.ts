import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { ShoppingCartService } from '../../../store/services/shopping-cart.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from 'src/app/common/components/button/button.component';
import { ProductImageDirective } from 'src/app/common/directives/product-image.directive';

@Component({
  selector: 'app-cart-dropdown',
  templateUrl: './cart-dropdown.component.html',
  styles: [],
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonComponent, ProductImageDirective],
})
export class CartDropdownComponent {
  private _cartService = inject(ShoppingCartService);

  public showMenu: boolean = false;

  public cartItems = this._cartService.shoppingCart;
  public cartUnits = this._cartService.cartUnits;
  public cartAmmount = this._cartService.cartAmmount;

  constructor() {}

  public displayDropdown(): void {
    this.showMenu = true;
  }

  public hideDropdown(): void {
    this.showMenu = false;
  }
}
