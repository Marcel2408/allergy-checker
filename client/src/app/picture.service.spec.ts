import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { PictureService } from './picture.service';

describe('PictureService', () => {
  let httpTestingController: HttpTestingController;
  let service: PictureService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PictureService],
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PictureService);
  });

  it('should be created', () => {
    const service: PictureService = TestBed.inject(PictureService);
    expect(service).toBeTruthy();
  });
});
