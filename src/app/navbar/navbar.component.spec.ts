import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import {RouterTestingModule} from '@angular/router/testing';
import { Router } from '@angular/router';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      providers: [{ provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); } }],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('isLoading should be true at first', () => {
    expect(component.isLoading).toBe(true, 'true at first');
  })
  it('isLoading should be false after 2s', fakeAsync(() => {
        let component = new NavbarComponent();
        expect(component.isLoading).toBe(true)
        component.ngOnInit()
        tick(2000)
        expect(component.isLoading).toBeFalse()
  }))
});
