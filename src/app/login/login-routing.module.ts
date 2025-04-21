import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';
import { SignupComponent } from './components/signup/signup.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SignupCompletedComponent } from './components/signup-completed/signup-completed.component';
import { ResetPasswordCompletedComponent } from './components/reset-password-completed/reset-password-completed.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
  },
  { path: 'signup', component: SignupComponent },
  { path: 'signup-completed', component: SignupCompletedComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  {
    path: 'reset-password-completed',
    component: ResetPasswordCompletedComponent,
  },
  {
    path: '**',
    component: LoginPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
