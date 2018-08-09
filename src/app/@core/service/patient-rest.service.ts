import { RestService } from './rest.service';
import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PatientRestService extends RestService {

  constructor(injector: Injector) {
    super('Patient', injector);
  }
}
