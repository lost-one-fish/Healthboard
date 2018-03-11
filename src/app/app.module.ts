import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatListModule, MatSidenavModule } from '@angular/material';
import { ChartModule } from 'angular2-highcharts';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule, MatCheckboxModule, MatSidenavModule, MatListModule,
    ChartModule.forRoot(require('highcharts/highstock'))
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
