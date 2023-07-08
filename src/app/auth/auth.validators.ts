import { AbstractControl, ValidatorFn } from '@angular/forms';

export const customEmailValidator: ValidatorFn = (control: AbstractControl) => {
  const value = control.value;
  const emailPattern: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!emailPattern.test(value)) {
    return {
      email: {
        message: 'Email is not valid',
        actualValue: value,
      },
    };
  }

  return null;
};
