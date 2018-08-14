import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { IndexComponent } from './index/index.component';
import { DxDataGridModule, DxLoadPanelModule, DxTextBoxModule } from 'devextreme-angular';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    DxTextBoxModule,
    DxDataGridModule,
    DxLoadPanelModule,
    HomeRoutingModule,
  ],
  declarations: [
    HomeComponent,
    IndexComponent,
  ],
})
export class HomeModule { }
