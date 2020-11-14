import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllergiesComponent } from './allergies/allergies.component';
import { InputComponent } from './input/input.component';

const routes: Routes = [
  { path: '', redirectTo: '/allergies', pathMatch: 'full' },
  { path: 'can-i-eat', component: InputComponent},
  { path: 'allergies', component: AllergiesComponent},
  { path: '**', redirectTo: '/can-i-eat' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
