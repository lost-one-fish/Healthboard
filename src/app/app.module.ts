/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from './@core/utils/auth-guard.service';
import { TokenInterceptor } from './@core/utils/token.interceptor';
import * as Raven from 'raven-js';
import { environment } from '../environments/environment';
import { FhirModule } from './@fhir/fhir.module';

if (environment.production) {
  Raven
  .config('https://dc388ad5e68f4ad7a3428baa06ecea6b@sentry.io/1260940')
  .install();
}

export class RavenErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    if (environment.production) {
      Raven.captureException(err);
    }
    console.error(err);
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    FhirModule.forRoot(environment.fhirServer),
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'},
    AuthGuard,
    {provide: ErrorHandler, useClass: RavenErrorHandler},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
  ],
})
export class AppModule {
}
