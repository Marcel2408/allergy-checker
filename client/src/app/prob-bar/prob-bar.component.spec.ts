import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ProbBarComponent } from './prob-bar.component';

describe('ProbBarComponent', () => {
  let component: ProbBarComponent;
  let fixture: ComponentFixture<ProbBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProbBarComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProbBarComponent);
    component = fixture.componentInstance;
    component.ingredient = { id: '1', name: 'tomato', prob: 1 };
    fixture.detectChanges();
  });

  it('should create prob-bar component', () => {
    expect(component).toBeTruthy();
  });
});
