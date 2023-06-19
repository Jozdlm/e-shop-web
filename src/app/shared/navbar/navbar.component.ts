import { Component, Input } from '@angular/core';
import { CartDropdownComponent } from './cart-dropdown/cart-dropdown.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from 'src/app/common/components/button/button.component';
import { WishlistDropdownComponent } from './wishlist-dropdown/wishlist-dropdown.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonComponent,
    CartDropdownComponent,
    SearchInputComponent,
    WishlistDropdownComponent,
  ],
})
export class NavbarComponent {
  @Input() businessName: string = '';

  constructor() {}
}
