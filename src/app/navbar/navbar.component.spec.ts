import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import {RouterTestingModule} from '@angular/router/testing';
import { NavigationEnd, Router } from '@angular/router';
import {By} from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  // let rootElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      // providers: [{ provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); } }],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // rootElement = fixture.debugElement;
    
  });
  
  afterEach(() => {
    fixture = null;
    component = null;
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when sign out button clicked a user should be redirected to /login page', () => {
    const singOutButton = fixture.debugElement.nativeElement.querySelector('.signout_link');
    console.log(singOutButton)
    expect(singOutButton.textContent).toEqual('Sign Out');
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

  it('Sign Out should redirect to the login path', fakeAsync(() => {
    component.isLoading = false;
    fixture.detectChanges();
    const link = fixture.debugElement.query(By.css('.signout_link'));
    tick();
    console.log(link);
}));

});
