import { Injectable } from '@angular/core';
import { SmartContextHandler } from './smart-context-handler';


@Injectable({
  providedIn: 'root',
})
export class SmartContext implements SmartContextHandler {

  private _baseUrl: string = 'http://hapi.lan/baseDstu3';

  public set baseUrl(baseUrl: string) {
    console.info(baseUrl);
    this._baseUrl = baseUrl;
  }

  getContext(): FHIR.SMART.Context {
    return {
      serviceUrl: this._baseUrl,
    };
  }
}
