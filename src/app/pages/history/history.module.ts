import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from './history-routing.module';
import { HistoryComponent } from './history.component';
import { IndexComponent } from './index/index.component';
import { ConditionListComponent } from './condition-list/condition-list.component';
import { ProcedureListComponent } from './procedure-list/procedure-list.component';
import { DxSchedulerModule } from 'devextreme-angular/ui/scheduler';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    DxSchedulerModule,
    HistoryRoutingModule,
  ],
  declarations: [HistoryComponent, IndexComponent, ConditionListComponent, ProcedureListComponent],
})
export class HistoryModule { }
