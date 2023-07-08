import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from 'src/app/common/components/button/button.component';
import { customEmailValidator } from '../../auth.validators';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './signup-page.component.html',
})
export class SignupPageComponent {
  private _fb: FormBuilder = inject(FormBuilder);

  public signupForm: FormGroup = this._fb.nonNullable.group({
    first_name: ['', [Validators.required, Validators.minLength(3)]],
    last_name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, customEmailValidator]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    repeated_password: ['', [Validators.required, Validators.minLength(6)]],
  });

  public handleSubmit(): void {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
    }
  }
}
