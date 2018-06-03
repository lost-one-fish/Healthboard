import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemSettingsRoutingModule } from './system-settings-routing.module';
import { SystemSettingsComponent } from './system-settings.component';
import { ThemeModule } from '../../@theme/theme.module';

const components = [
  SystemSettingsComponent,
];
@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    SystemSettingsRoutingModule
  ],
  declarations: [
    ...components,
  ],
})
export class SystemSettingsModule { }
