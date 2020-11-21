import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { AllergyService } from './allergy.service';
import { Allergy } from './allergy';

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

  afterEach(()=>{
    httpTestingController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
