import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaseManagementComponent } from './case-management.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [{
  path: '',
  component: CaseManagementComponent,
  children: [{
    path: 'index',
    component: IndexComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CaseManagementRoutingModule { }
