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

  beforeEach(async () => {
    mockAllergyService = jasmine.createSpyObj(['getAllergiesFromDB', 'addToAllergies', 'deleteAllergy', 'deleteItem', 'filterAllergy']);
    mockAllergyService.allergiesChanged = new Subject<void>();
    let getResponse = new Observable(sub => sub.next(mockAllergyService.allergies));
    let deleteResponse = new Observable(sub => sub.next(mockAllergyService.allergies = [...mockAllergyService.allergies.filter((allergy) => allergy.allergy !== name)]));
    mockAllergyService.getAllergiesFromDB.and.returnValue(getResponse);
    mockAllergyService.deleteAllergy.and.returnValue(deleteResponse);


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
    mockAllergyService.allergies = [{id: 1, allergy: 'ham'}, {id: 2, allergy: 'potato'},{id: 3, allergy: 'lemon'}];
    fixture.detectChanges();
    const newElement = fixture.debugElement.query(By.css('.item'));
    expect(newElement).toBeTruthy();
  }));

  it(`should display 'Hmm... no allergies?' if no data returned from the database`, fakeAsync(() => {
    mockAllergyService.allergies = [];
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('.item'));
    const newElement = fixture.debugElement.query(By.css('.allergy-display_none'));
    expect(element).toBeFalsy();
    expect(newElement).toBeTruthy();
  }));

  it('should delete an item when item delete button clicked', fakeAsync(() => {
    mockAllergyService.allergies = [{id: 1, allergy: 'ham'}, {id: 2, allergy: 'potato'},{id: 3, allergy: 'lemon'}];
    fixture.detectChanges();
    const childInstance = fixture.debugElement.query(By.css('.item')).componentInstance;
    spyOn(childInstance, 'deleteItem');
    const element = fixture.debugElement.query(By.css('.item'));
    const button = element.query(By.css('button')).nativeElement;
    button.click();
    childInstance.deleteItem();
    tick();
    console.log("🚀 ~ file: allergy-display.component.spec.ts ~ line 76 ~ it ~ mockAllergyService.allergies", mockAllergyService.allergies)
    fixture.detectChanges();
    console.log("🚀 ~ file: allergy-display.component.spec.ts ~ line 60 ~ it ~ button", button)

  }));


});

