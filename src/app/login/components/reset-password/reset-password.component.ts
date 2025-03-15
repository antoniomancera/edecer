import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import {
  matchPasswords,
  noWhitespaceValidator,
} from 'src/app/shared/validators/custom-validators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['../../login.page.scss'],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup(
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

  onSubmitResetPassword() {
    this.authenticationService.setResetPassword(
      this.resetPasswordForm.controls.password.getRawValue()
    );
  }
}
