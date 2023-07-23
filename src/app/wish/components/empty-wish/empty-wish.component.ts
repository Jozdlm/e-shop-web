import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from 'src/app/common/components/button/button.component';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-empty-wish',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent],
  templateUrl: './empty-wish.component.html',
})
export class EmptyWishComponent {
  private _authService: AuthService = inject(AuthService);
  public user = this._authService.user;
}
