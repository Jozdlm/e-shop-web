import { Component, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from 'src/app/common/components/dropdown/dropdown.component';
import { RouterModule } from '@angular/router';
import { IMenuItem } from 'src/app/common/interfaces/menu-item';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-user-dropdown',
  standalone: true,
  imports: [CommonModule, RouterModule, DropdownComponent],
  templateUrl: './user-dropdown.component.html',
})
export class UserDropdownComponent {
  private _authService: AuthService = inject(AuthService);

  public user: Signal<User | null | undefined> = this._authService.user;

  public baseLink: string = 'account';
  public menuItems: IMenuItem[] = [
    { link: 'profile', placeholder: 'Mi información' },
    { link: 'shipping_addresses', placeholder: 'Mis direcciones' },
    { link: 'my-orders', placeholder: 'Mis pedidos' },
    { link: 'purchase-history', placeholder: 'Historial de compras' },
  ];

  public logout(): void {
    this._authService.logout().catch(console.log);
  }
}
