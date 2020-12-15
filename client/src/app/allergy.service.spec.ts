import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { Allergy } from './allergy';
import { AllergyService } from './allergy.service';

describe('AllergyService', () => {
  let httpTestingController: HttpTestingController;
  let service: AllergyService;
  let mockAllergy: Allergy;
  let BASE_URL = 'http://localhost:3000';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AllergyService],
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AllergyService);
    mockAllergy = {id: 1, allergy: 'ham'};
  });
  afterEach(() => {
    httpTestingController = null
    service = null;
    mockAllergy = null;
  });


  it('should create `AllergyService`', () => {
    expect(service).toBeTruthy();
  });

  it('should GET a list of allergies', () => {
   service.getAllergiesFromDB().subscribe((allergies) => {
     expect(allergies[0]).toEqual(mockAllergy);
   });
   const request = httpTestingController.expectOne(`${BASE_URL}/allergy`);
   request.flush([mockAllergy]);
   httpTestingController.verify();
  });

  it('should POST an allergy to DB', () => {
    service.postAllergy(mockAllergy).subscribe((data) => {
      expect(data[0]).toEqual(mockAllergy);
    });
    const request = httpTestingController.expectOne(`${BASE_URL}/allergy`);
    request.flush([mockAllergy]);
    httpTestingController.verify();
   });
});
