import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from 'src/app/common/components/button/button.component';
import {
  customEmailValidator,
  passwordMatchValidator,
} from '../../auth.validators';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './signup-page.component.html',
})
export class SignupPageComponent {
  private _authService: AuthService = inject(AuthService);
  private _router: Router = inject(Router);
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

  public handleSubmit(): void {
    if (this.signupForm.valid) {
      const { first_name, last_name, email, password } = this.signupForm.value;
      const fullname = `${first_name} ${last_name}`;

      this._authService
        .signup(fullname, email!, password!)
        .subscribe((_) => console.log('registrado correctamente'));

      this.signupForm.reset();
      this._router.navigate(['/']);
    }
  }
}
