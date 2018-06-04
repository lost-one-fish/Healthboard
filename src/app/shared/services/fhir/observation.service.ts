import { Injectable } from '@angular/core';
import { GenericFhirService } from './generic-fhir.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ObservationService extends GenericFhirService<fhir.Observation> {

  constructor(http: HttpClient) {
    super('Observation', http);
  }

}
