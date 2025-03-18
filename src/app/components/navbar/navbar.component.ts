import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartDropdownComponent } from '@app/components/cart-dropdown/cart-dropdown.component';
import { UserDropdownComponent } from '@app/components/user-dropdown/user-dropdown.component';
import { AuthService } from '@app/features/auth/auth.service';
import { BUSINESS_NAME } from '@app/constants';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [
    RouterModule,
    CartDropdownComponent,
    UserDropdownComponent,
    SvgIconComponent,
  ],
})
export class NavbarComponent {
  private _authService: AuthService = inject(AuthService);
  public businessName: string = BUSINESS_NAME;
  public isLogged = this._authService.isLogged;
}
