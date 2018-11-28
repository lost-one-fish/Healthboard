import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthJWTToken, NbAuthModule, NbPasswordAuthStrategy } from '@nebular/auth';
import { NbRoleProvider, NbSecurityModule } from '@nebular/security';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { DataModule } from './data/data.module';
import { AnalyticsService } from './utils/analytics.service';
import { environment } from '../../environments/environment';
import { RoleProvider } from './utils/role.provider';

export const NB_CORE_PROVIDERS = [
  ...DataModule.forRoot().providers,
  ...NbAuthModule.forRoot({

    strategies: [
      NbPasswordAuthStrategy.setup({
        name: 'email',
        baseEndpoint: environment['backend'],
        register: {
          endpoint: '/api/auth/register',
          method: 'post',
          redirect: {
            success: '/',
            failure: null,
          },
          defaultMessages: ['您已經成功註冊'],
        },
        login: {
          alwaysFail: false,
          endpoint: '/api/auth/token',
          method: 'post',
          redirect: {
            success: '/',
            failure: null,
          },
          defaultErrors: ['您的帳號密碼登入不正確，請重新輸入'],
          defaultMessages: ['您已經成功登入'],
        },
        logout: {
          alwaysFail: false,
          endpoint: '/api/auth/logout',
          method: 'post',
          redirect: {
            success: '/auth/login',
            failure: '/auth/login',
          },
          defaultErrors: ['有些不對勁，請再試一次'],
          defaultMessages: ['您已經成功登出'],
        },
        requestPass: {
          endpoint: '/api/auth/request-pass',
          method: 'post',
          redirect: {
            success: '/auth/login',
            failure: null,
          },
        },
        resetPass: {
          endpoint: '/api/auth/reset-pass',
          method: 'put',
          redirect: {
            success: '/auth/login',
            failure: null,
          },
          resetPasswordTokenKey: 'reset_password_token',
          defaultErrors: ['有些不對勁，請再試一次'],
          defaultMessages: ['您已經成功變更密碼'],
        },
        refreshToken: {
          endpoint: '/api/auth/refresh-token',
          method: 'post',
          redirect: {
            success: null,
            failure: null,
          },
          defaultErrors: ['有些不對勁，請再試一次'],
          defaultMessages: ['您已經成功更新通行碼'],
        },
        token: {
          key: 'access_token', // this parameter tells Nebular where to look for the token
          class: NbAuthJWTToken,
        },
        errors: {
          key: 'errors',
        },
        messages: {
          key: 'messages',
        },
      }),
    ],
    forms: {
      login: {
        // delay before redirect after a successful login, while success message is shown to the user
        redirectDelay: 1000,
        strategy: 'email',  // provider id key. If you have multiple providers, or what to use your own
        rememberMe: true,   // whether to show or not the `rememberMe` checkbox
        showMessages: {     // show/not show success/error messages
          success: true,
          error: true,
        },
      },
      requestPassword: {
        redirectDelay: 10000,
        strategy: 'email',
        showMessages: {
          success: true,
          error: true,
        },
      },
      resetPassword: {
        redirectDelay: 4000,
        strategy: 'email',
        showMessages: {
          success: true,
          error: true,
        },
      },
      logout: {
        redirectDelay: 2000,
        strategy: 'email',
      },
      validation: {
        email: {
          required: true,
        },
        password: {
          required: true,
          minLength: 8,
        },
      },
    },
  }).providers,
  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: [
          'home',
          'case-management',
          'laboratory',
          'history',
          'system-settings',
        ],
      },
      user: {
        parent: 'guest',
        view: '*',
        create: '*',
        edit: '*',
        remove: '*',
      },
      admin: {
        parent: 'user',
        view: '*',
      },
    },
  }).providers,
  {
    provide: NbRoleProvider,
    useClass: RoleProvider,
  },
  AnalyticsService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
