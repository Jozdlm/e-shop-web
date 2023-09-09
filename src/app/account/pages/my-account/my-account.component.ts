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
import { UserPhotoDirective } from 'src/app/common/directives/user-photo.directive';
import { User } from '@supabase/supabase-js';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    UserPhotoDirective,
  ],
  templateUrl: './my-account.component.html',
})
export class MyAccountComponent {
  private _authService: AuthService = inject(AuthService);
  private _userService: UserService = inject(UserService);
  private _fb: FormBuilder = inject(FormBuilder);

  public isLogged = this._authService.isLogged;
  public profileForm!: FormGroup;

  constructor() {
    effect(() => {
      if (this.isLogged()) {
        this.createFormGroup(this._authService.session!.user);
      }
    });
  }

  public createFormGroup(user: User): void {
    const { user_metadata, email } = user;
    const displayName = user_metadata['fullname'];

    this.profileForm = this._fb.nonNullable.group({
      full_name: [displayName, [Validators.required, Validators.minLength(6)]],
      email: [email, [Validators.required, Validators.email]],
    });
  }

  public updateUserValues(): void {
    if (!this.profileForm.valid) return;

    this._userService.updateUser(this.profileForm.value);
  }
}
