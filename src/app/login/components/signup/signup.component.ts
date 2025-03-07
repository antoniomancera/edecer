import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import {
  matchPasswords,
  noWhitespaceValidator,
} from 'src/app/shared/validators/custom-validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup(
      {
        username: new FormControl(null, [
          Validators.required,
          noWhitespaceValidator,
        ]),
        email: new FormControl(null, [
          Validators.required,
          noWhitespaceValidator,
          Validators.email,
        ]),
        password: new FormControl(null, [
          Validators.required,
          noWhitespaceValidator,
        ]),
        confirmPassword: new FormControl(null, [
          Validators.required,
          noWhitespaceValidator,
        ]),
      },
      { validators: matchPasswords }
    );
  }

  noWhitespaceValidator: ValidatorFn = (control: FormControl) => {
    return (control.value || '').trim().length ? null : { whitespace: true };
  };

  onSubmitSignUp(): void {
    if (this.signupForm.valid) {
      const credentials = {
        email: this.signupForm.controls.email.getRawValue(),
        password: this.signupForm.controls.password.getRawValue(),
      };
      this.authenticationService
        .signUp(credentials)
        .then((res) => console.log('res', res));
    }
  }
}
