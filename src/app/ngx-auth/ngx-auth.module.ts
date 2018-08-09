import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxAuthRoutingModule } from './ngx-auth-routing.module';
import { NgxAuthBlockComponent } from './auth-block/auth-block.component';
import { NgxLoginComponent } from './login/login.component';
import { NgxLogoutComponent } from './logout/logout.component';
import { NgxRegisterComponent } from './register/register.component';
import { NgxRequestPasswordComponent } from './request-password/request-password.component';
import { NgxResetPasswordComponent } from './reset-password/reset-password.component';
import { NgxAuthComponent } from './auth.component';
import { ThemeModule } from '../@theme/theme.module';

const components = [
  NgxAuthComponent,
  NgxAuthBlockComponent,
  NgxLoginComponent,
  NgxLogoutComponent,
  NgxRegisterComponent,
  NgxRequestPasswordComponent,
  NgxResetPasswordComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    NgxAuthRoutingModule,
  ],
  declarations: [...components],
})
export class NgxAuthModule { }
