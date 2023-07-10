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
    const { full_name, email } = user;

    this.profileForm = this._fb.nonNullable.group({
      full_name: [full_name, [Validators.required, Validators.minLength(6)]],
      email: [email, [Validators.required, Validators.email]],
    });
  }

  public updateUserValues(): void {
    if(!this.profileForm.valid) return;

    this._userService.updateUser(this.userId, this.profileForm.value)
      .subscribe({
        next: (_) => console.log('usuario modificado correctamente')
      });
  }
}
