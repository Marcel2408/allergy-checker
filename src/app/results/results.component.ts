import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Allergy } from '../allergy';
import { AllergyService } from '../allergy.service';
import { Ingredient } from '../ingredient';
import { PictureService } from '../picture.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  subscription: Subscription;
  allergies: string[] = [];

  constructor(
    private apiPicService: PictureService,
    private allergyService: AllergyService
  ) {}

  ngOnInit(): void {

    this.allergies = this.allergyService.allergies.map(
      (allergy) => allergy.allergy
    );
    this.subscription = this.apiPicService.ingredientsChanged.subscribe(() => {
      if (this.allergyService.allergies.length === 0) {
        this.ingredients = [...this.apiPicService.ingredients];
      } else {
        this.ingredients = this.apiPicService.ingredients.filter((ingredient) =>
          this.allergies.includes(ingredient.name)
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); //avoids memory leaking
  }
}
