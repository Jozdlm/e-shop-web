import { Component, inject } from '@angular/core';
import { DropdownComponent } from '@app/components/dropdown/dropdown.component';
import { RouterModule } from '@angular/router';
import { AuthService } from '@app/features/auth/auth.service';

@Component({
  selector: 'app-user-dropdown',
  imports: [RouterModule, DropdownComponent],
  templateUrl: './user-dropdown.component.html',
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
