import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { IndexComponent } from './index/index.component';
import { DxButtonModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    DxButtonModule,
    HomeRoutingModule,
  ],
  declarations: [
    HomeComponent,
    IndexComponent,
  ],
})
export class HomeModule { }
