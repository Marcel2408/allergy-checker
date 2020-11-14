import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProbBarComponent } from './prob-bar.component';

describe('ProbBarComponent', () => {
  let component: ProbBarComponent;
  let fixture: ComponentFixture<ProbBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProbBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProbBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
