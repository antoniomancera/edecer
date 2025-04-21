import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { noWhitespaceValidator } from 'src/app/shared/validators/custom-validators';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['../../login.page.scss'],
})
export class ForgetPasswordComponent implements OnInit {
  forgetPasswordForm!: FormGroup;
  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.forgetPasswordForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        noWhitespaceValidator,
        Validators.email,
      ]),
    });
  }

  onSubmitForgetPassword() {
    this.authenticationService
      .sendPasswordReset(this.forgetPasswordForm.controls.email.getRawValue())
      .then((valor) => console.log(valor));
  }
}
