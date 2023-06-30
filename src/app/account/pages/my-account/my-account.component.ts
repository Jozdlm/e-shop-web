import { toSignal } from '@angular/core/rxjs-interop';
import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserService } from '../../services/user.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from 'src/app/common/components/button/button.component';
import { IUser } from '../../user';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './my-account.component.html',
})
export class MyAccountComponent {
  private _authService: AuthService = inject(AuthService);
  private _userService: UserService = inject(UserService);
  private _fb: FormBuilder = inject(FormBuilder);

  public userId = this._authService.currentSession().id;
  public user = toSignal(this._userService.getUserById(this.userId));

  public profileForm!: FormGroup;

  constructor() {
    effect(() => {
      if (this.user()?.id) {
        this.createFormGroup(this.user()!);
      }
    });
  }

  public createFormGroup(user: IUser): void {
    const { first_name, last_name, email } = user;
    const { code, number } = user.phone;
    const { country, state, city, exact_address } = user.address;

    this.profileForm = this._fb.nonNullable.group({
      first_name: [first_name, Validators.required],
      last_name: [last_name, Validators.required],
      email: [email, [Validators.required, Validators.email]],
      phone: this._fb.nonNullable.group({
        code: [code, Validators.required],
        number: [number, [Validators.required, Validators.min(0)]],
      }),
      address: this._fb.nonNullable.group({
        country: [country, Validators.required],
        state: [state, Validators.required],
        city: [city, Validators.required],
        exact_address: [exact_address, Validators.required],
      }),
    });
  }
}
