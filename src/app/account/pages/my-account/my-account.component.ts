import { toSignal } from '@angular/core/rxjs-interop';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-account.component.html',
})
export class MyAccountComponent {
  private _authService: AuthService = inject(AuthService);
  private _userService: UserService = inject(UserService);

  public userId = this._authService.currentSession().id;
  public user = toSignal(
    this._userService.getUserById(this.userId)
  );
}
