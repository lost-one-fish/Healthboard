import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CaseManagementRoutingModule } from './case-management-routing.module';
import { CaseManagementComponent } from './case-management.component';
import { ThemeModule } from '../../@theme/theme.module';

const components = [
  CaseManagementComponent,
]
@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    CaseManagementRoutingModule,
  ],
  declarations: [
    ...components,
  ],
})
export class CaseManagementModule { }
