import { Component, Input, inject } from '@angular/core';
import { CartDropdownComponent } from './cart-dropdown/cart-dropdown.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from 'src/app/common/components/button/button.component';
import { WishlistDropdownComponent } from './wishlist-dropdown/wishlist-dropdown.component';
import { RouterModule } from '@angular/router';
import { UserDropdownComponent } from './user-dropdown/user-dropdown.component';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CartDropdownComponent,
    SearchInputComponent,
    WishlistDropdownComponent,
    UserDropdownComponent,
  ],
})
export class NavbarComponent {
  private _authService: AuthService = inject(AuthService);

  @Input() 
  public businessName: string = '';
  public user = this._authService.user;

  constructor() {}
}
