import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemSettingsComponent } from './system-settings.component';
import { ManageUserComponent } from './manage-user/manage-user.component';


const routes: Routes = [{
  path: '',
  component: SystemSettingsComponent,
  children: [{
    path: 'manage-user',
    component: ManageUserComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemSettingsRoutingModule { }
