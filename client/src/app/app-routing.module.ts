import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllergiesComponent } from './allergies/allergies.component';
import { InputComponent } from './input/input.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SigninComponent } from './signin/signin.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: SigninComponent },
  {
    path: 'dashboard',
    component: NavbarComponent,
    children: [
      { path: '', redirectTo: 'allergies', pathMatch: 'full' },
      { path: 'can-i-eat', component: InputComponent },
      { path: 'allergies', component: AllergiesComponent },
    ],
  },

  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
