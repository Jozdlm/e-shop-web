import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { ShoppingCartService } from '../../../store/services/shopping-cart.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from 'src/app/common/components/button/button.component';
import { ProductImageDirective } from 'src/app/common/directives/product-image.directive';
import { DropdownComponent } from 'src/app/common/components/dropdown/dropdown.component';

@Component({
  selector: 'app-cart-dropdown',
  templateUrl: './cart-dropdown.component.html',
  styles: [],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ButtonComponent,
    ProductImageDirective,
    DropdownComponent,
  ],
})
export class CartDropdownComponent {
  private _cartService = inject(ShoppingCartService);

  public cartItems = this._cartService.cartItems;
  public cartUnits = this._cartService.cartUnits;
  public subtotal = this._cartService.subtotal;

  constructor() {}
}
