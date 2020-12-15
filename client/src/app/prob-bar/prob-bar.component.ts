import { Component, Input, OnInit } from '@angular/core';
import { Ingredient } from '../ingredient';

@Component({
  selector: 'app-prob-bar',
  templateUrl: './prob-bar.component.html',
  styleUrls: ['./prob-bar.component.scss']
})
export class ProbBarComponent implements OnInit {

  @Input() ingredient: Ingredient;

  constructor() { }

  ngOnInit(): void {
  }

}
