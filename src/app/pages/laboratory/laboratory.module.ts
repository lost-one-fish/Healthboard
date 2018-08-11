import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LaboratoryRoutingModule } from './laboratory-routing.module';
import { IndexComponent } from './index/index.component';
import { LaboratoryComponent } from './laboratory.component';

const components = [
  LaboratoryComponent,
  IndexComponent,
];


@NgModule({
  imports: [
    CommonModule,
    LaboratoryRoutingModule,
  ],
  declarations: [...components],
})
export class LaboratoryModule {
}
