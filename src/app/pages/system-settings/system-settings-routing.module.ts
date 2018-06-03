import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemSettingsComponent } from './system-settings.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


const routes: Routes = [{
  path: '',
  component: SystemSettingsComponent,
  children: [{
    path: 'manage-user',
    component: ManageUserComponent,
  }, {
    path: 'change-password',
    component: ChangePasswordComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemSettingsRoutingModule { }
