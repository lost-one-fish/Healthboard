import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxAuthComponent } from './auth.component';
import { NgxLoginComponent } from './login/login.component';
import { NgxLogoutComponent } from './logout/logout.component';
import { NgxRequestPasswordComponent } from './request-password/request-password.component';
import { NgxResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [{
  path: '',
  component: NgxAuthComponent,
  children: [{
    path: '',
    component: NgxLoginComponent,
  }, {
    path: 'login',
    component: NgxLoginComponent,
  }, {
    path: 'logout',
    component: NgxLogoutComponent,
  }, {
    path: 'request-password',
    component: NgxRequestPasswordComponent,
  }, {
    path: 'reset-password',
    component: NgxResetPasswordComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgxAuthRoutingModule {
}
