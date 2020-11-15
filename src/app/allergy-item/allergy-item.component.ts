import { Component, Input, OnInit } from '@angular/core';
import { Allergy } from '../allergy';
import { AllergyService } from '../allergy.service';

@Component({
  selector: 'app-allergy-item',
  templateUrl: './allergy-item.component.html',
  styleUrls: ['./allergy-item.component.scss']
})
export class AllergyItemComponent implements OnInit {

  @Input() allergy:Allergy;

  constructor(private allergyService: AllergyService) { }

  ngOnInit(): void {
  }

  deleteItem(event):void {
    this.allergyService.deleteAllergy(this.allergy)
    .subscribe(() => {
      this.allergyService.filterAllergy(this.allergy.id);
    })
  }

}
