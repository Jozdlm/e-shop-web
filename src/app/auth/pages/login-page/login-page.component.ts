import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from 'src/app/common/components/button/button.component';
import { RouterModule } from '@angular/router';
import { customEmailValidator } from '../../auth.validators';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ButtonComponent],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  private _fb: FormBuilder = inject(FormBuilder);

  public loginForm = this._fb.nonNullable.group({
    email: ['', [Validators.required, customEmailValidator]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
}
