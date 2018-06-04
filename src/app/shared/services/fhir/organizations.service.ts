import { Injectable } from '@angular/core';
import { GenericFhirService } from './generic-fhir.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OrganizationsService extends GenericFhirService<fhir.Organization> {

  constructor(http: HttpClient) {
    super('Organization', http);
  }

  findByName(name, page?: number, limit?: number) {
    return this.search(`name=${name}`, page, limit);
  }
}
