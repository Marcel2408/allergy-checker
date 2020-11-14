import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllergyItemComponent } from './allergy-item.component';

describe('AllergyItemComponent', () => {
  let component: AllergyItemComponent;
  let fixture: ComponentFixture<AllergyItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllergyItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllergyItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
