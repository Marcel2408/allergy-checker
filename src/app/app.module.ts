import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {WebcamModule} from 'ngx-webcam';

import { AppComponent } from './app.component';
import { InputComponent } from './input/input.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AllergiesComponent } from './allergies/allergies.component';

import { PictureService } from './picture.service';
import { ResultsComponent } from './results/results.component';
import { ProbBarComponent } from './prob-bar/prob-bar.component';
import { AddAllergyComponent } from './add-allergy/add-allergy.component';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    NavbarComponent,
    AllergiesComponent,
    ResultsComponent,
    ProbBarComponent,
    AddAllergyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    WebcamModule,
    ReactiveFormsModule
  ],
  providers: [PictureService],
  bootstrap: [AppComponent]
})
export class AppModule { }
