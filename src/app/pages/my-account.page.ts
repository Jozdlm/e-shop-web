import { Component, effect, inject } from '@angular/core';
import { UserService } from '../account/user.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from 'src/app/common/components/button/button.component';
import { User } from '@supabase/supabase-js';
import { AuthService } from '@app/auth/auth.service';

@Component({
  imports: [ReactiveFormsModule, ButtonComponent],
  template: `
    <div class="mx-auto w-96">
      <h1 class="mb-6 text-2xl">Mi cuenta</h1>

      @if (profileForm) {
        <form
          autocomplete="off"
          [formGroup]="profileForm"
          (ngSubmit)="updateUserValues()"
        >
          <div class="mb-8 flex flex-col gap-y-4">
            <div class="flex flex-col">
              <label
                class="mb-1.5 text-sm font-medium text-neutral-800"
                for="first_name"
                >Nombre:</label
              >
              <input
                class="rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:outline-green-700"
                type="text"
                id="first_name"
                formControlName="full_name"
              />
            </div>
            <div class="flex flex-col">
              <label
                class="mb-1.5 text-sm font-medium text-neutral-800"
                for="email"
                >Correo:</label
              >
              <input
                class="rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:outline-green-700"
                type="text"
                id="email"
                placeholder="account@example.com"
                formControlName="email"
              />
            </div>
          </div>
          <app-button
            [disabled]="!profileForm.valid"
            [fullWidth]="true"
            (click)="updateUserValues()"
            >Guardar</app-button
          >
        </form>
      }
    </div>
  `,
})
export class MyAccountPage {
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
