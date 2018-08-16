import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LaboratoryComponent } from './laboratory.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [{
  path: '',
  component: LaboratoryComponent,
  children: [{
    path: 'index',
    component: IndexComponent,
  }, {
    path: 'index/:patientId',
    component: IndexComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LaboratoryRoutingModule { }
