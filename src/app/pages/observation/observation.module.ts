import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObservationListComponent } from './observation-list/observation-list.component';
import {
  DxDataGridModule,
  DxDateBoxModule,
  DxNumberBoxModule,
  DxTextBoxModule,
  DxToolbarModule,
} from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    DxTextBoxModule,
    DxNumberBoxModule,
    DxDateBoxModule,
    DxToolbarModule,
    DxDataGridModule,
  ],
  declarations: [
    ObservationListComponent,
  ],
  exports: [
    ObservationListComponent,
  ],
})
export class ObservationModule { }
