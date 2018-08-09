import { Injectable } from '@angular/core';
import { SmartContextHandler } from './smart-context-handler';


@Injectable()
export class SmartContext implements SmartContextHandler {

  getContext(): FHIR.SMART.Context {
    return {
      serviceUrl:  'http://hapi.lan/baseDstu3',
    };
  }
}
