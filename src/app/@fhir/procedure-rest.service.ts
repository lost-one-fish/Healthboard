import { RestService } from './rest.service';
import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProcedureRestService extends RestService {

  constructor(injector: Injector) {
    super('Procedure', injector);
  }
}
