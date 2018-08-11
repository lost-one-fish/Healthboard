import { RestService } from './rest.service';
import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ObservationRestService extends RestService {

  constructor(injector: Injector) {
    super('Observation', injector);
  }
}
