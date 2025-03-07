import { FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const noWhitespaceValidator: ValidatorFn = (control: FormControl) => {
  return (control.value || '').trim().length ? null : { whitespace: true };
};

export const matchPasswords: ValidatorFn = (
  control: FormControl
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (
    password &&
    confirmPassword &&
    password.value &&
    confirmPassword.value &&
    password.value.trim() != confirmPassword.value.trim()
  ) {
    return { mathPasswordsEror: true };
  }
  return null;
};
