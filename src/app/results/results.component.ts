import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../ingredient';
import { PictureService } from '../picture.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit, OnDestroy   {
  ingredients: Ingredient[] = [];
  subscription: Subscription;

  constructor(private apiPicService: PictureService) {}

  ngOnInit(): void {
    // todo: get allergies from the allergy.service
    this.subscription =   this.apiPicService.ingredientsChanged.subscribe(() => {
      // todo: fill ingredients[] with the allergies that contain ingredient (bc ingredients from Clarifai are always singular)
      this.ingredients = [...this.apiPicService.ingredients.slice(0, 5)];
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); //avoids memory leaking
  }

}
