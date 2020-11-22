import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { Observable, Subject } from 'rxjs';

import { AllergyDisplayComponent } from '../allergy-display/allergy-display.component';
import { AllergyItemComponent } from './allergy-item.component';
import { AllergyService } from '../allergy.service';
import { ComponentRef } from '@angular/core';


describe('AllergyItemComponent', () => {
  let component: AllergyItemComponent;
  let fixture: ComponentFixture<AllergyItemComponent>;
  let mockAllergyService;

  beforeEach(async () => {
    mockAllergyService = jasmine.createSpyObj(['deleteAllergy', 'filterAllergy']);
    mockAllergyService.allergies = [{id: 1, allergy: 'ham'}, {id: 2, allergy: 'potato'},{id: 3, allergy: 'lemon'}];
    mockAllergyService.allergiesChanged = new Subject<void>();
    const response = new Observable(sub=>sub.next([{id: 1, allergy: 'ham'}, {id: 2, allergy: 'potato'}]));
    mockAllergyService.deleteAllergy.and.returnValue(response)

    await TestBed.configureTestingModule({
      declarations: [ AllergyItemComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ { provide: AllergyService, useValue: mockAllergyService } ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllergyItemComponent);
    component = fixture.componentInstance;
    component.allergy = {id: 3, allergy: 'lemon'}
    fixture.detectChanges();
  });

  it('should create an allergy item component', () => {
    expect(component).toBeTruthy();
  });

  it('should render name of allergy in a p tag', fakeAsync(() => {
    const name = fixture.debugElement.nativeElement.querySelector('p').textContent;
    expect(name).toContain('lemon');
  }));

  it('should call deleteItem method when component button is clicked', fakeAsync(() => {
    spyOn(component, 'deleteItem');
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click()
    tick();
    expect(component.deleteItem).toHaveBeenCalled();
  }));

});
