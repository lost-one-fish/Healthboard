import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CaseManagementRoutingModule } from './case-management-routing.module';
import { CaseManagementComponent } from './case-management.component';
import { ThemeModule } from '../../@theme/theme.module';
import { CasesComponent } from './cases/cases.component';
import { NewCaseComponent } from './new-case/new-case.component';
import { MatIconModule } from '@angular/material';
import { DxDataGridModule } from 'devextreme-angular';

const components = [
  CasesComponent,
  NewCaseComponent,
  CaseManagementComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    CaseManagementRoutingModule,
    MatIconModule,
    DxDataGridModule,
  ],
  declarations: [
    ...components,
  ],
})
export class CaseManagementModule { }
