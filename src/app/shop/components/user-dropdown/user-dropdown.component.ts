import { Component, inject } from '@angular/core';

import { DropdownComponent } from 'src/app/common/components/dropdown/dropdown.component';
import { RouterModule } from '@angular/router';
import { IMenuItem } from 'src/app/common/interfaces/menu-item';
import { AuthService } from '@app/features/auth/auth.service';

@Component({
    selector: 'app-user-dropdown',
    imports: [RouterModule, DropdownComponent],
    templateUrl: './user-dropdown.component.html'
})
export class UserDropdownComponent {
  private _authService: AuthService = inject(AuthService);

  public baseLink: string = 'my-account';

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
