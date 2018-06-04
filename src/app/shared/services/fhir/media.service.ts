import { Injectable } from '@angular/core';
import { GenericFhirService } from './generic-fhir.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MediasService extends GenericFhirService<fhir.Media> {

  constructor(http: HttpClient) {
    super('Media', http);
  }

}
