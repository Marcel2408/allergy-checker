import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Allergy } from '../allergy';
import { AllergyService } from '../allergy.service';

@Component({
  selector: 'app-allergy-display',
  templateUrl: './allergy-display.component.html',
  styleUrls: ['./allergy-display.component.scss']
})
export class AllergyDisplayComponent implements OnInit {

  constructor(private allergyService: AllergyService) { }

  allergies: Allergy[] = [];
  subscription: Subscription;

  ngOnInit(): void {
    this.allergyService
    .getAllergiesFromDB()
    .subscribe(allergies => {
      this.allergies = [...allergies];
      this.allergyService.addToAllergies(allergies);
    })

    this.subscription = this.allergyService.allergiesChanged.subscribe(
      () => {
        this.allergies = [...this.allergyService.allergies]
        console.log(this.allergies);

      }
    )
  }

}
