import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TranslocoModule } from '@jsverse/transloco';

import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';
import { SignupComponent } from './components/signup/signup.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SharedModule } from '../shared/shared.module';
import { LoginTitleComponent } from './components/login-title/login-title.component';
import { SignupCompletedComponent } from './components/signup-completed/signup-completed.component';
import { ResetPasswordCompletedComponent } from './components/reset-password-completed/reset-password-completed.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LoginPageRoutingModule,
    TranslocoModule,
    SharedModule,
  ],
  declarations: [
    LoginPage,
    SignupComponent,
    SignupCompletedComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    ResetPasswordCompletedComponent,
    LoginTitleComponent,
  ],
})
export class LoginPageModule {}
