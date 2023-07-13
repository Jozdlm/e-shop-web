import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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

  public handleSubmitForm(): void {
    if (this.loginForm.valid) {
      const credentials: ILoginUser = {
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!,
      };

      this._authService
        .login(credentials)
        .pipe(tap((_) => this.loginForm.reset()))
        .subscribe({
          next: (_) => console.log('Sesión iniciada correctamente'),
          error: (error) =>
            console.log(
              `Ha ocurrido un error: ${error.code}, ${error.message}`
            ),
        });
    }
  }
}
