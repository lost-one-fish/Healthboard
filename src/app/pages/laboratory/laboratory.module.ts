import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LaboratoryRoutingModule } from './laboratory-routing.module';
import { IndexComponent } from './index/index.component';
import { LaboratoryComponent } from './laboratory.component';
import { LabFormComponent } from './lab-form/lab-form.component';
import { LabListComponent } from './lab-list/lab-list.component';
import { ThemeModule } from '../../@theme/theme.module';
import { DxDateBoxModule, DxNumberBoxModule, DxTextBoxModule } from 'devextreme-angular';

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
    LaboratoryRoutingModule,
  ],
  declarations: [...components],
})
export class LaboratoryModule {
}
