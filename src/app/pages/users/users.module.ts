import { ThemeModule } from '../../@theme/theme.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { MatIconModule } from '@angular/material';
import { ToasterModule } from 'angular2-toaster';

const components = [
  UsersComponent,
  ProfileComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    MatIconModule,
    ToasterModule.forRoot(),
    UsersRoutingModule,
  ],
  declarations: [...components],
})
export class UsersModule { }
