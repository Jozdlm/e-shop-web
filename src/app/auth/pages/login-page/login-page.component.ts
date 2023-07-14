import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from 'src/app/common/components/button/button.component';
import { RouterModule } from '@angular/router';
import { customEmailValidator } from '../../auth.validators';
import { AuthService } from '../../services/auth.service';
import { ILoginUser } from '../../auth';
import { tap } from 'rxjs';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ButtonComponent],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  private _fb: FormBuilder = inject(FormBuilder);
  private _authService: AuthService = inject(AuthService);

  public loginForm = this._fb.nonNullable.group({
    email: ['', [Validators.required, customEmailValidator]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  public loginError = signal<boolean>(false);

  public get emailControl(): AbstractControl {
    return this.loginForm.get('email')!;
  }

  public get passwordControl(): AbstractControl {
    return this.loginForm.get('password')!;
  }

  public handleSubmitForm(): void {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      const credentials: ILoginUser = {
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!,
      };

      this._authService
        .login(credentials)
        .pipe(tap((_) => this.loginForm.reset()))
        .subscribe({
          next: (_) => this.loginError.set(false),
          error: (_) => this.loginError.set(true)
        });
    }
  }
}
