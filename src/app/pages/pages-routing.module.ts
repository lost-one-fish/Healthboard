import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'home',
    loadChildren: './home/home.module#HomeModule',
  }, {
    path: 'case-management',
    loadChildren: './case-management/case-management.module#CaseManagementModule',
  }, {
    path: 'laboratory',
    loadChildren: './laboratory/laboratory.module#LaboratoryModule',
  }, {
    path: 'system-settings',
    loadChildren: './system-settings/system-settings.module#SystemSettingsModule',
  }, {
    path: 'miscellaneous',
    loadChildren: './miscellaneous/miscellaneous.module#MiscellaneousModule',
  }, {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  }, {
    path: '**',
    component: NotFoundComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
