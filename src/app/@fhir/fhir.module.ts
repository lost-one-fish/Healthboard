import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../@core/core.module';
import { SmartContextConfig } from './smart-context-config';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
})
export class fhirModule {

  static forRoot(config: SmartContextConfig): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        {provide: SmartContextConfig, useValue: config},
      ],
    };
  }

}
