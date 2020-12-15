import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
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
export class ResultsComponent implements OnInit {
  ingredients: Ingredient[] = [];
  allergies: string[] = [];
  isSafe = false;

  constructor(
    private apiPicService: PictureService,
    private allergyService: AllergyService
  ) {}

  ngOnInit(): void {
    this.allergies = this.allergyService.allergies.map(
      (allergy) => allergy.allergy
    );

    this.ingredients = this.apiPicService.ingredients.filter((ingredient) =>
      this.allergies.includes(ingredient.name)
    );
    if (!this.ingredients.length) {
      this.isSafe = true;
    }

  }

}
