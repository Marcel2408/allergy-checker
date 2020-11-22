import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { Observable, Subject } from 'rxjs';

import { AllergyDisplayComponent } from './allergy-display.component';
import { AllergyService } from '../allergy.service';
import { AllergyItemComponent } from '../allergy-item/allergy-item.component';

describe('AllergyDisplayComponent', () => {
  let component: AllergyDisplayComponent;
  let fixture: ComponentFixture<AllergyDisplayComponent>;
  let mockAllergyService;
  let mockData;

  beforeEach(async () => {
    mockAllergyService = jasmine.createSpyObj(['getAllergiesFromDB', 'addToAllergies']);
    mockAllergyService.allergies = []
    mockAllergyService.allergiesChanged = new Subject<void>();
    let response = new Observable(sub => sub.next(mockData));
    mockAllergyService.getAllergiesFromDB.and.returnValue(response);

    await TestBed.configureTestingModule({
      declarations: [ AllergyDisplayComponent, AllergyItemComponent ],
      imports: [HttpClientTestingModule],
      providers: [ { provide: AllergyService, useValue: mockAllergyService } ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllergyDisplayComponent);
    component = fixture.componentInstance;
  });

  it('should create an allergy display component', () => {
    expect(component).toBeTruthy();
  });

  it('should display items if some data returned from the database', fakeAsync(() => {
    mockData = [{id: 1, allergy: 'ham'}, {id: 2, allergy: 'potato'},{id: 3, allergy: 'lemon'}];
    fixture.detectChanges();
    let newElement = fixture.debugElement.query(By.css('.item'));
    expect(newElement).toBeTruthy();
  }));

  it(`should display 'Hmm... no allergies?' if no data returned from the database`, fakeAsync(() => {
    mockData = [];
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.item'));
    let newElement = fixture.debugElement.query(By.css('.allergy-display_none'));
    expect(element).toBeFalsy();
    expect(newElement).toBeTruthy();
  }));


});

