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
  isNone = false;

  ngOnInit(): void {
    console.log('on init called')
    if (this.allergyService.allergies.length === 0) {
      console.log('if condition')
      this.allergyService
      .getAllergiesFromDB()
      .subscribe(allergies => {
        console.log({allergies})
        this.allergies = [...allergies];
        this.allergyService.addToAllergies(allergies);
        if (!this.allergies.length) this.isNone = true;
        else this.isNone = false;
      });
    }
    else {
      this.allergies = [...this.allergyService.allergies];
      if (!this.allergies.length) this.isNone = true;
      else this.isNone = false;
    }

    this.subscription = this.allergyService.allergiesChanged.subscribe(
      () => {
        this.allergies = [...this.allergyService.allergies];
        if (!this.allergies.length) this.isNone = true;
        else this.isNone = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
