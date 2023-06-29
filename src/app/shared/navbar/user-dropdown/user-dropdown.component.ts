import { Component, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from 'src/app/common/components/dropdown/dropdown.component';
import { RouterModule } from '@angular/router';
import { IMenuItem } from 'src/app/common/interfaces/menu-item';
import { UserService } from 'src/app/account/services/user.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { IUser } from '../../../account/user';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-user-dropdown',
  standalone: true,
  imports: [CommonModule, RouterModule, DropdownComponent],
  templateUrl: './user-dropdown.component.html',
  styles: [],
})
export class UserDropdownComponent {
  private _userService: UserService = inject(UserService);
  private _authService: AuthService = inject(AuthService);

  private _userId: string = this._authService.currentSession().id;

  public user: Signal<IUser | undefined> = toSignal<IUser>(
    this._userService.getUserById(this._userId)
  );

  public menuItems: IMenuItem[] = [
    { link: 'my-account', placeholder: 'Configuración cuenta' },
    { link: 'my-orders', placeholder: 'Mis pedidos' },
    { link: 'purchase-history', placeholder: 'Historial de compras' },
  ];
}
