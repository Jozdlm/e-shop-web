import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from 'src/app/common/components/button/button.component';
import {
  customEmailValidator,
  passwordMatchValidator,
} from '../../auth.validators';
import { AuthService } from '../../services/auth.service';
import { ICreateUser } from '../../auth';
import { tap } from 'rxjs';
import { AuthError } from '@angular/fire/auth';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './signup-page.component.html',
})
export class SignupPageComponent {
  private _authService: AuthService = inject(AuthService);
  private _fb: FormBuilder = inject(FormBuilder);

  public signupForm = this._fb.nonNullable.group(
    {
      first_name: ['', [Validators.required, Validators.minLength(3)]],
      last_name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, customEmailValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeated_password: ['', [Validators.required, Validators.minLength(6)]],
    },
    { validators: passwordMatchValidator }
  );

  public signupError = signal<boolean>(false);

  public getFormControl(controlName: string): AbstractControl {
    return this.signupForm.get(controlName)!;
  }

  public handleSubmit(): void {
    if (this.signupForm.valid) {
      const { first_name, last_name, email, password } = this.signupForm.value;

      const newUser: ICreateUser = {
        fullname: `${first_name} ${last_name}`,
        email: email!,
        password: password!,
      };

      this._authService
        .signup(newUser)
        .pipe(tap((_) => this.signupForm.reset()))
        .subscribe({
          next: (_) => this.signupError.set(false),
          error: (error: AuthError) => this.handleErrorSignup(error) 
        });
    }
  }

  public handleErrorSignup(error: AuthError) {
    if(error.code == 'auth/email-already-exists') {
      this.signupError.set(true);
    }
  }
}
