import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { IndexComponent } from './index/index.component';
import {
  DxDataGridModule,
  DxLoadPanelModule,
  DxPopupModule,
  DxScrollViewModule,
  DxTextBoxModule,
} from 'devextreme-angular';
import { ThemeModule } from '../../@theme/theme.module';
import { ObservationModule } from '../observation/observation.module';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    DxTextBoxModule,
    DxDataGridModule,
    DxLoadPanelModule,
    DxScrollViewModule,
    DxPopupModule,
    ObservationModule,
    HomeRoutingModule,
  ],
  declarations: [
    HomeComponent,
    IndexComponent,
  ],
  bootstrap: [
    IndexComponent,
  ],
})
export class HomeModule {
}
