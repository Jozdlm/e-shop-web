import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { CartDropdownComponent } from 'src/app/shop/components/cart-dropdown/cart-dropdown.component';
import { UserDropdownComponent } from 'src/app/shop/components/user-dropdown/user-dropdown.component';
import { AccountIconComponent } from 'src/app/shared/icons/account-icon/account-icon.component';
import { SearchIconComponent } from 'src/app/shared/icons/search-icon/search-icon.component';
import { AuthService } from '@app/auth/auth.service';

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
  private _appService: AppService = inject(AppService);

  public businessName: string = '';
  public isLogged = this._authService.isLogged;

  constructor() {
    this.businessName = this._appService.getBusinessName();
  }
}
