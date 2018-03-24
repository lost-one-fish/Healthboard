import { Injectable } from '@angular/core';
import {GenericFhirService} from './generic-fhir.service';
import Device = fhir.Device;
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DevicesService extends GenericFhirService<Device> {

  constructor(http: HttpClient) {
    super('Device', http);
  }

}
