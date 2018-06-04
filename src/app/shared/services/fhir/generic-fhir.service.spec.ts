/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GenericFhirService } from './generic-fhir.service';

describe('GenericFhirService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenericFhirService]
    });
  });

  it('should ...', inject([GenericFhirService], (service: GenericFhirService<any>) => {
    expect(service).toBeTruthy();
  }));
});
