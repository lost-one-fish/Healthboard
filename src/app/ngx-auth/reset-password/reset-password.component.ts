/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { getDeepFromObject } from '@nebular/auth/helpers';
import { NB_AUTH_OPTIONS, NbAuthResult, NbAuthService } from '@nebular/auth';

@Component({
  selector: 'ngx-reset-password-page',
  styleUrls: ['./reset-password.component.scss'],
  template: `
    <ngx-auth-block>
      <h2 class="title">Change password</h2>
      <small class="form-text sub-title">請您輸入一組新的密碼</small>
      <form (ngSubmit)="resetPass()" #resetPassForm="ngForm">

        <div *ngIf="errors && errors.length > 0 && !submitted" class="alert alert-danger" role="alert">
          <div><strong>Oh 糟糕!</strong></div>
          <div *ngFor="let error of errors">{{ error }}</div>
        </div>
        <div *ngIf="messages && messages.length > 0 && !submitted" class="alert alert-success" role="alert">
          <div><strong>Hooray!</strong></div>
          <div *ngFor="let message of messages">{{ message }}</div>
        </div>

        <div class="form-group">
          <label for="input-password" class="sr-only">新密碼</label>
          <input name="password" [(ngModel)]="user.password" type="password" id="input-password"
                 class="form-control form-control-lg first" placeholder="新密碼" #password="ngModel"
                 [class.form-control-danger]="password.invalid && password.touched"
                 [required]="getConfigValue('forms.validation.password.required')"
                 [minlength]="getConfigValue('forms.validation.password.minLength')"
                 [maxlength]="getConfigValue('forms.validation.password.maxLength')"
                 autofocus>
          <small class="form-text error" *ngIf="password.invalid && password.touched && password.errors?.required">
            請輸入您的密碼
          </small>
          <small
            class="form-text error"
            *ngIf="password.invalid && password.touched && (password.errors?.minlength || password.errors?.maxlength)">
            密碼應包含
            {{getConfigValue('forms.validation.password.minLength')}} 到
            {{getConfigValue('forms.validation.password.maxLength')}}
            個字元
          </small>
        </div>

        <div class="form-group">
          <label for="input-re-password" class="sr-only">驗證密碼</label>
          <input
            name="rePass" [(ngModel)]="user.confirmPassword" type="password" id="input-re-password"
            class="form-control form-control-lg last" placeholder="驗證密碼" #rePass="ngModel"
            [class.form-control-danger]="(rePass.invalid || password.value != rePass.value) && rePass.touched"
            [required]="getConfigValue('forms.validation.password.required')">
          <small class="form-text error"
                 *ngIf="rePass.invalid && rePass.touched && rePass.errors?.required">
            請輸入驗證密碼。
          </small>
          <small
            class="form-text error"
            *ngIf="rePass.touched && password.value != rePass.value && !rePass.errors?.required">
            密碼與驗證密碼不一致，請重新輸入
          </small>
        </div>

        <button [disabled]="submitted || !resetPassForm.form.valid" class="btn btn-hero-success btn-block"
                [class.btn-pulse]="submitted">
          變更密碼
        </button>
      </form>
    </ngx-auth-block>
  `,
})
export class NgxResetPasswordComponent {

  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};

  constructor(protected service: NbAuthService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              protected router: Router) {

    this.redirectDelay = this.getConfigValue('forms.resetPassword.redirectDelay');
    this.showMessages = this.getConfigValue('forms.resetPassword.showMessages');
    this.strategy = this.getConfigValue('forms.resetPassword.strategy');
  }

  resetPass(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    this.service.resetPassword(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;
      if (result.isSuccess()) {
        this.messages = result.getMessages();
      } else {
        this.errors = result.getErrors();
      }

      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
