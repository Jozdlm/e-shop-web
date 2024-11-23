import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from 'src/app/common/components/dropdown/dropdown.component';
import { RouterModule } from '@angular/router';
import { IMenuItem } from 'src/app/common/interfaces/menu-item';
import { AuthService } from '@app/auth/auth.service';

@Component({
    selector: 'app-user-dropdown',
    imports: [CommonModule, RouterModule, DropdownComponent],
    templateUrl: './user-dropdown.component.html'
})
export class UserDropdownComponent {
  private _authService: AuthService = inject(AuthService);

  public baseLink: string = 'account';
  public menuItems: IMenuItem[] = [
    { link: 'profile', placeholder: 'Mi información' },
    { link: 'shipping_addresses', placeholder: 'Mis direcciones' },
    { link: 'my-orders', placeholder: 'Mis pedidos' },
    { link: 'purchase-history', placeholder: 'Historial de compras' },
  ];

  public get userInfo() {
    const user = this._authService.session?.user;
    return {
      email: user?.email,
      fullname: user?.user_metadata['fullname'],
    };
  }

  public logout(): void {
    this._authService.logout().catch(console.log);
  }
}
