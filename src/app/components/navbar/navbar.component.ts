import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartDropdownComponent } from '@app/components/cart-dropdown/cart-dropdown.component';
import { UserDropdownComponent } from '@app/components/user-dropdown/user-dropdown.component';
import { AccountIconComponent } from 'src/app/shared/icons/account-icon/account-icon.component';
import { SearchIconComponent } from 'src/app/shared/icons/search-icon/search-icon.component';
import { AuthService } from '@app/features/auth/auth.service';
import { BUSINESS_NAME } from '@app/constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [
    RouterModule,
    CartDropdownComponent,
    UserDropdownComponent,
    AccountIconComponent,
    SearchIconComponent,
  ],
})
export class NavbarComponent {
  private _authService: AuthService = inject(AuthService);
  public businessName: string = BUSINESS_NAME;
  public isLogged = this._authService.isLogged;
}
