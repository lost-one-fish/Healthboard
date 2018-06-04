import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericFhirService } from './generic-fhir.service';
import { Patient } from './fhir.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PatientsService extends GenericFhirService<Patient> {

  constructor(http: HttpClient) {
    super('Patient', http);
  }

  findByNameAndManagingOrganization(name, organization, page?: number, limit?: number) {
    return this.search(`name=${name}&organization=${organization}`, page, limit);
  }

  findByIdentifier(system: string, value: string) {
    return this.search(`identifier=${system}|${value}`);
  }

  findByManagingOrganization(organization, page?: number, limit?: number) {
    return this.search(`organization=${organization}`, page, limit);
  }

  sortByName(dir, page?: number, limit?: number) {
    return this.sort('name', dir, page, limit);
  }

  countByAgeGreatThanEqualsAndLessThanEquals(age, age2) {
    const today: Date = new Date();
    const thisYear = today.getUTCFullYear();

    const year1 = thisYear - age;
    const year2 = thisYear - age2;

    return this.executeHttpGet(`${this.URL}/${this.resourceType}?birthdate=gt${year2}&birthdate=le${year1}`)
      .flatMap(result => {
        const total: number = result.total;
        return Observable.of(total);
      });
  }

  countByGenderAndAgeGreatThanEqualsAndLessThanEquals(gender, age, age2) {
    const today: Date = new Date();
    const thisYear = today.getUTCFullYear();

    const year1 = thisYear - age;
    const year2 = thisYear - age2;

    return this.executeHttpGet(`${this.URL}/${this.resourceType}?gender=${gender}&birthdate=ge${year2}&birthdate=le${year1}`)
      .flatMap(result => {
        const total: number = result.total;
        return Observable.of(total);
      });
  }

  countByManagingOrganization(organization) {
    return this.executeHttpGet(`${this.URL}/${this.resourceType}?organization=${organization}`)
      .flatMap(result => {
        const total: number = result.total;
        return Observable.of(total);
      });
  }
}
