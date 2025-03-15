import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../shared/services/authentication.service';
import { noWhitespaceValidator } from '../shared/validators/custom-validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm?: FormGroup;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
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
            if (response.error) {
              alert(`Error de login: ${response.error.message}`);
            } else {
              this.router.navigate(['tabs/home']);
            }
          })
          .catch((error) => {
            console.error('Error en el login:', error);
            alert(`Error de login: ${error.message}`);
          });
      });
    }
  }
}
