import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule,
  MatPaginatorModule, MatSidenavModule,
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


@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    HomeComponent,
    ProfileComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule, MatCheckboxModule, MatSidenavModule, MatListModule, MatIconModule, MatToolbarModule, MatGridListModule, MatCardModule,
    MatSortModule, MatPaginatorModule, MatTableModule, MatFormFieldModule, MatInputModule
  ],
  providers: [AuthService, PatientsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
