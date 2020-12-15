import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import {RouterTestingModule} from '@angular/router/testing';
import { Router } from '@angular/router';
import { routes } from '../app-routing.module';
import {By} from '@angular/platform-browser';
import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  afterEach(() => {
    fixture = null;
    component = null;
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('isLoading should be true at first', () => {
    expect(component.isLoading).toBe(true, 'true at first');
  });

  it('isLoading should be false after 2s', fakeAsync(() => {
    let component = new NavbarComponent();
    expect(component.isLoading).toBe(true)
    component.ngOnInit()
    tick(2000)
    expect(component.isLoading).toBeFalse()
  }));

  it('sign out button should redirect to login page', fakeAsync (inject([Router, Location], (router: Router, location: Location) =>{
    component.isLoading = false;
    fixture.detectChanges();
    fixture.debugElement.query(By.css('.signout_link')).nativeElement.click();
    tick();
    expect(location.path()).toEqual('/login');
  })));

  it('can i eat button should redirect to can-i-eat page', fakeAsync (inject([Router, Location], (router: Router, location: Location) =>{
    component.isLoading = false;
    fixture.detectChanges();
    fixture.debugElement.queryAll(By.css('.navbar_link'))[0].nativeElement.click();
    tick();
    expect(location.path()).toEqual('/dashboard/can-i-eat');
  })));

});


