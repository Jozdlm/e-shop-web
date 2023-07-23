import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AppService } from 'src/app/app.service';
import { SearchInputComponent } from 'src/app/shop/components/search-input/search-input.component';
import { CartDropdownComponent } from 'src/app/shop/components/cart-dropdown/cart-dropdown.component';
import { WishlistDropdownComponent } from 'src/app/shop/components/wishlist-dropdown/wishlist-dropdown.component';
import { UserDropdownComponent } from 'src/app/shop/components/user-dropdown/user-dropdown.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
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
  private _appService: AppService = inject(AppService);

  public businessName: string  = '';
  public user = this._authService.user;

  constructor() {
    this._appService.getBusinessInfo()
      .then(value => this.businessName = value?.name || '');
  }
}
