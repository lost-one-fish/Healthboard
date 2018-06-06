import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule, NbEmailPassAuthProvider } from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { of as observableOf } from 'rxjs/observable/of';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { DataModule } from './data/data.module';
import { AnalyticsService } from './utils/analytics.service';
import { Configuration } from '../app-config';

const socialLinks = [
];

const NB_CORE_PROVIDERS = [
  ...DataModule.forRoot().providers,
  ...NbAuthModule.forRoot({
    providers: {
      email: {
        service: NbEmailPassAuthProvider,
        config: {
          delay: 3000,
          baseEndpoint: Configuration.authServer,
          login: {
            alwaysFail: false,
            rememberMe: true,
            'endpoint': '/api/auth/token',
            method: 'post',
            redirect: {
              success: '/',
              failure: null,
            },
            defaultErrors: ['Login/Email combination is not correct, please try again.'],
            defaultMessages: ['You have been successfully logged in.'],
          },
          register: {
            alwaysFail: false,
            rememberMe: true,
            endpoint: '/api/auth/register',
            method: 'post',
            redirect: {
              success: '/',
              failure: null,
            },
            defaultErrors: ['Something went wrong, please try again.'],
            defaultMessages: ['You have been successfully registered.'],
          },
          logout: {
            alwaysFail: false,
            endpoint: '/api/auth/logout',
            method: 'post',
            redirect: {
              success: '/auth/login',
              failure: '/auth/login',
            },
            defaultErrors: ['Something went wrong, please try again.'],
            defaultMessages: ['You have been successfully logged out.'],
          },
          resetPass: {
            endpoint: '/api/auth/reset-pass',
            method: 'put',
            redirect: {
              success: '/',
              failure: null,
            },
            resetPasswordTokenKey: 'reset_password_token',
            defaultErrors: ['Something went wrong, please try again.'],
            defaultMessages: ['Your password has been successfully changed.'],
          },
          refreshToken: {
            endpoint: '/api/auth/refresh-token',
            method: 'post',
            redirect: {
              success: null,
              failure: null,
            },
            defaultErrors: ['Something went wrong, please try again.'],
            defaultMessages: ['Your token has been successfully refreshed.'],
          },
          token: {
            key: 'access_token', // this parameter tells Nebular where to look for the token
          },
          errors: {
            key: 'errors',
          },
          messages: {
            key: 'messages',
          },
        },
      },
    },
    forms: {
      login: {
        // delay before redirect after a successful login, while success message is shown to the user
        redirectDelay: 500,
        provider: 'email',  // provider id key. If you have multiple providers, or what to use your own
        rememberMe: true,   // whether to show or not the `rememberMe` checkbox
        showMessages: {     // show/not show success/error messages
          success: true,
          error: true,
        },
        socialLinks: socialLinks, // social links at the bottom of a page
      },
      register: {
        socialLinks: socialLinks,
      },
      validation: {
        password: {
          required: true,
          minLength: 3,
        },
      },
    },
  }).providers,
  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: '*',
      },
      user: {
        parent: 'guest',
        create: '*',
        edit: '*',
        remove: '*',
      },
    },
  }).providers,
  {
    provide: NbRoleProvider,
    useValue: {
      getRole: () => {
        return observableOf('guest'); // here you could provide any role based on any auth flow
      },
    },
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
