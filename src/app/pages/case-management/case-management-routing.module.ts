import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaseManagementComponent } from './case-management.component';
import { CasesComponent } from './cases/cases.component';
import { NewCaseComponent } from './new-case/new-case.component';

const routes: Routes = [{
  path: '',
  component: CaseManagementComponent,
  children: [{
    path: 'cases',
    component: CasesComponent,
  }, {
    path: 'new-case',
    component: NewCaseComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CaseManagementRoutingModule { }
