import { Component, inject } from '@angular/core';
import { ShoppingCartService } from '../../../store/services/shopping-cart.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from 'src/app/common/components/button/button.component';
import { ProductImageDirective } from 'src/app/common/directives/product-image.directive';
import { DropdownComponent } from 'src/app/common/components/dropdown/dropdown.component';

@Component({
  selector: 'app-cart-dropdown',
  templateUrl: './cart-dropdown.component.html',
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
  private _cartService: ShoppingCartService = inject(ShoppingCartService);
  public cart = this._cartService.shoppingCart;

  constructor() {}
}
