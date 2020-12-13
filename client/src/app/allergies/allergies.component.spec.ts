import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { AllergiesComponent } from './allergies.component';
import { AllergyDisplayComponent } from '../allergy-display/allergy-display.component';
import { AddAllergyComponent } from '../add-allergy/add-allergy.component';
import { AllergyItemComponent } from '../allergy-item/allergy-item.component';
import { AllergyService } from '../allergy.service';

describe('AllergiesComponent', () => {
  let component: AllergiesComponent;
  let fixture: ComponentFixture<AllergiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllergiesComponent, AllergyDisplayComponent, AddAllergyComponent, AllergyItemComponent ],
      imports: [HttpClientTestingModule],
      providers: [ AllergyService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllergiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create allergy component', () => {
    expect(component).toBeTruthy();
  });
});
