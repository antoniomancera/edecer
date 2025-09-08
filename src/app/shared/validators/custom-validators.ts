import {
  FormArray,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

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

export function minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      .map((control) => control.value)
      .reduce((prev, next) => (next ? prev + next : prev), 0);

    return totalSelected >= min ? null : { required: true };
  };

  return validator;
}
