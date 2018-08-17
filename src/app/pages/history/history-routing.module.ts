import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './history.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [{
  path: '',
  component: HistoryComponent,
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
export class HistoryRoutingModule { }
