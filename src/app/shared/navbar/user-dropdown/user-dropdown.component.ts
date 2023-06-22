import { Component, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from 'src/app/common/components/dropdown/dropdown.component';
import { RouterModule } from '@angular/router';
import { IMenuItem } from 'src/app/common/interfaces/menu-item';
import { UserService } from 'src/app/account/services/user.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { IUser } from '../../../account/user';

@Component({
  selector: 'app-user-dropdown',
  standalone: true,
  imports: [CommonModule, RouterModule, DropdownComponent],
  templateUrl: './user-dropdown.component.html',
  styles: [],
})
export class UserDropdownComponent {
  private _userService: UserService = inject(UserService);

  public user: Signal<IUser | undefined> = toSignal<IUser>(
    this._userService.getUserByEmail('jmprueba@example.com')
  );

  public menuItems: IMenuItem[] = [
    { link: 'my-account', placeholder: 'Configuración cuenta' },
    { link: 'my-orders', placeholder: 'Mis pedidos' },
    { link: 'purchase-history', placeholder: 'Historial de compras' },
  ];
}
