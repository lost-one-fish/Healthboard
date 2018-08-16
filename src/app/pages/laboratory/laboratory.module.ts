import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LaboratoryRoutingModule } from './laboratory-routing.module';
import { IndexComponent } from './index/index.component';
import { LaboratoryComponent } from './laboratory.component';
import { LabFormComponent } from './lab-form/lab-form.component';
import { LabListComponent } from './lab-list/lab-list.component';
import { ThemeModule } from '../../@theme/theme.module';
import {
  DxDataGridModule,
  DxDateBoxModule,
  DxNumberBoxModule,
  DxPopupModule,
  DxScrollViewModule,
  DxTextBoxModule,
  DxToolbarModule,
} from 'devextreme-angular';
import { ObservationModule } from '../observation/observation.module';

const components = [
  LaboratoryComponent,
  IndexComponent,
  LabFormComponent,
  LabListComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    DxTextBoxModule,
    DxNumberBoxModule,
    DxDateBoxModule,
    DxToolbarModule,
    DxDataGridModule,
    DxScrollViewModule,
    DxPopupModule,
    ObservationModule,
    LaboratoryRoutingModule,
  ],
  declarations: [...components],
  exports: [LabListComponent],
})
export class LaboratoryModule {
}
