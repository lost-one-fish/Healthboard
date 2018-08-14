import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { IndexComponent } from './index/index.component';
import { DxTextBoxModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    DxTextBoxModule,
    HomeRoutingModule,
  ],
  declarations: [
    HomeComponent,
    IndexComponent,
  ],
})
export class HomeModule { }
