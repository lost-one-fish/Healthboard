import { RestService } from './rest.service';
import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrganizationRestService extends RestService {

  constructor(injector: Injector) {
    super('Organization', injector);
  }
}
