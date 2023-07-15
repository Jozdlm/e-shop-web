import { AbstractControl, ValidatorFn } from '@angular/forms';

export const customEmailValidator: ValidatorFn = (control: AbstractControl) => {
  const value = control.value;
  const emailPattern: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!emailPattern.test(value)) {
    return { email: true };
  }

  return null;
};

export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
) => {
  const password = control.get('password');
  const password2 = control.get('repeated_password');

  const errors = password2?.errors || {};

  if (password?.value === password2?.value) {
    delete errors['passwordMismatch'];
    return null;
  }

  errors['passwordMismatch'] = true;
  password2?.setErrors(errors);

  return { passwordMismatch: true };
};
