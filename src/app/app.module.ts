import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatListModule, MatSidenavModule } from '@angular/material';
import { ChartModule } from 'angular2-highcharts';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule,
  MatPaginatorModule, MatProgressSpinnerModule, MatSidenavModule,
  MatSortModule, MatTableModule,
  MatToolbarModule
} from '@angular/material';
import { CallbackComponent } from './callback/callback.component';
import { AuthService } from './auth/auth.service';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { UserComponent } from './user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { PatientsService } from './fhir/patients.service';
import { DeviceComponent } from './device/device.component';
import {DevicesService} from './fhir/devices.service';


@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    HomeComponent,
    ProfileComponent,
    UserComponent,
    DeviceComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ChartModule.forRoot(require('highcharts/highstock')),
    MatButtonModule, MatCheckboxModule, MatSidenavModule, MatListModule,
    HttpClientModule,
    MatButtonModule, MatCheckboxModule, MatSidenavModule, MatListModule, MatIconModule, MatToolbarModule, MatGridListModule, MatCardModule,
    MatSortModule, MatPaginatorModule, MatTableModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule
  ],
  providers: [AuthService, PatientsService, DevicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
