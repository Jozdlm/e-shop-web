import { toSignal } from '@angular/core/rxjs-interop';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserService } from '../../services/user.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './my-account.component.html',
})
export class MyAccountComponent {
  private _authService: AuthService = inject(AuthService);
  private _userService: UserService = inject(UserService);
  private _fb: FormBuilder = inject(FormBuilder);

  public userId = this._authService.currentSession().id;
  public user = toSignal(this._userService.getUserById(this.userId));

  public profileForm = this._fb.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: this._fb.group({
      code: [1, Validators.required],
      number: [undefined, [Validators.required, Validators.min(0)]],
    }),
    address: this._fb.group({
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      exact_address: ['', Validators.required],
    }),
  });
}
