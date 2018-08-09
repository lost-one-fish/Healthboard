/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BasicService } from './basic.service';

describe('BasicService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BasicService],
    });
  });

  it('should ...', inject([BasicService], (service: BasicService<any>) => {
    expect(service).toBeTruthy();
  }));
});
