import { Injectable } from '@angular/core';
import { Person } from './fhir.model';
import { GenericFhirService } from './generic-fhir.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PersonService extends GenericFhirService<Person> {

  constructor(http: HttpClient) {
    super('Person', http);
  }

  findByNameAndManagingOrganization(name, organization, page?: number, limit?: number) {
    return this.search(`name=${name}&organization=${organization}`, page, limit);
  }

  findByManagingOrganization(organization, page?: number, limit?: number) {
    return this.search(`organization=${organization}`, page, limit);
  }

}
