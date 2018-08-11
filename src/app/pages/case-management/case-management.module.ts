import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CaseManagementRoutingModule } from './case-management-routing.module';
import { CaseManagementComponent } from './case-management.component';
import { ThemeModule } from '../../@theme/theme.module';
import { CaseListComponent } from './case-list/case-list.component';
import { CaseFormComponent } from './case-form/case-form.component';
import { MatIconModule } from '@angular/material';
import { DxDataGridModule, DxLoadPanelModule } from 'devextreme-angular';
import { IndexComponent } from './index/index.component';

const components = [
  CaseListComponent,
  CaseFormComponent,
  CaseManagementComponent,
  IndexComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    CaseManagementRoutingModule,
    MatIconModule,
    DxDataGridModule,
    DxLoadPanelModule,
  ],
  declarations: [
    ...components,
  ],
})
export class CaseManagementModule { }
