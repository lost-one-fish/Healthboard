import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericFhirService } from './generic-fhir.service';
import { Patient } from './fhir.model';

@Injectable()
export class PatientsService extends GenericFhirService<Patient> {

  constructor(http: HttpClient) {
    super('Patient', http);
  }

  findByName(name, page?: number, limit?: number) {
    return this.search(`name=${name}`, page, limit);
  }

  findByIdentifier(system: string, value: string) {
    return this.search(`identifier=${system}|${value}`);
  }

  sortByName(dir, page?: number, limit?: number) {
    return this.sort('name', dir, page, limit);
  }
}
