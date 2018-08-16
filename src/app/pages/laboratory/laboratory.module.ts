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
  DxTextBoxModule,
  DxToolbarModule,
} from 'devextreme-angular';

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
    LaboratoryRoutingModule,
  ],
  declarations: [...components],
  exports: [LabListComponent],
})
export class LaboratoryModule {
}
