import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Allergy } from '../allergy';
import { AllergyService } from '../allergy.service';

@Component({
  selector: 'app-allergy-display',
  templateUrl: './allergy-display.component.html',
  styleUrls: ['./allergy-display.component.scss']
})
export class AllergyDisplayComponent implements OnInit, OnDestroy {

  constructor(private allergyService: AllergyService) { }

  allergies: Allergy[] = [];
  subscription: Subscription;

  ngOnInit(): void {

    if (this.allergyService.allergies.length === 0) {
      this.allergyService
      .getAllergiesFromDB()
      .subscribe(allergies => {
        this.allergies = [...allergies];
        this.allergyService.addToAllergies(allergies);
      })
    }
    else {
      this.allergies = [...this.allergyService.allergies];
    }

    this.subscription = this.allergyService.allergiesChanged.subscribe(
      () => {
        this.allergies = [...this.allergyService.allergies];

      }
    )
  }

  ngOnDestroy():void {
    this.subscription.unsubscribe();
  }

}
