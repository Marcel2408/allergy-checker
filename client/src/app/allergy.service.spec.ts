import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { AllergyService } from './allergy.service';

describe('AllergyService', () => {
  let httpTestingController: HttpTestingController;
  let service: AllergyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AllergyService],
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AllergyService);
  });

  it('should create `AllergyService`', () => {
    const service: AllergyService = TestBed.inject(AllergyService);
    expect(service).toBeTruthy();
  });
});
