import { Injectable } from '@angular/core';
import { GenericFhirService } from './generic-fhir.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DevicesService extends GenericFhirService<fhir.Device> {

  constructor(http: HttpClient) {
    super('Device', http);
  }

  findByManufacturerAndType(manufacturer, type, page?: number, limit?: number) {
    return this.search(`manufacturer=${manufacturer}&type=${type}`, page, limit);
  }

  findByType(type, page?: number, limit?: number) {
    return this.search(`type=${type}`, page, limit);
  }

}
