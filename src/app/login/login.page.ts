import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../shared/services/authentication.service';
import { noWhitespaceValidator } from '../shared/validators/custom-validators';
import { ToastService } from '../shared/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm?: FormGroup;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        noWhitespaceValidator,
      ]),
      password: new FormControl(null, [
        Validators.required,
        noWhitespaceValidator,
      ]),
    });
  }

  onSubmitLogin(): void {
    if (this.loginForm.valid) {
      const credentials = {
        email: this.loginForm.controls.email.getRawValue(),
        password: this.loginForm.controls.password.getRawValue(),
      };

      this.authenticationService.signOut().then(() => {
        this.authenticationService
          .signIn(credentials)
          .then((response) => {
            this.onAttemptLogin(response);
          })
          .catch((error) => {
            this.toastService.showDangerToast(error.message);
          });
      });
    }
  }

  onClickLoginGoogle() {
    this.authenticationService
      .signInGoogle()
      .then((response) => {
        this.onAttemptLogin(response);
      })
      .catch((error) => {
        this.toastService.showDangerToast(error.message);
      });
  }

  private onAttemptLogin(response) {
    console.log(response);
    if (response.error) {
      this.toastService.showDangerToast(response.error.message);
    } else {
      this.router.navigate(['tabs/home']);
    }
  }
}
