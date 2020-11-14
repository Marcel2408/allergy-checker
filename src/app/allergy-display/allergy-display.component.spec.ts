import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllergyDisplayComponent } from './allergy-display.component';

describe('AllergyDisplayComponent', () => {
  let component: AllergyDisplayComponent;
  let fixture: ComponentFixture<AllergyDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllergyDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllergyDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
