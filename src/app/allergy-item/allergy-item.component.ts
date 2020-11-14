import { Component, Input, OnInit } from '@angular/core';
import { Allergy } from '../allergy';

@Component({
  selector: 'app-allergy-item',
  templateUrl: './allergy-item.component.html',
  styleUrls: ['./allergy-item.component.scss']
})
export class AllergyItemComponent implements OnInit {

  @Input() allergy:Allergy;

  constructor() { }

  ngOnInit(): void {
  }

}
