import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericFhirService } from './generic-fhir.service';

@Injectable()
export class CompositionService extends GenericFhirService<fhir.Composition> {

  constructor(http: HttpClient) {
    super('Composition', http);
  }

}
