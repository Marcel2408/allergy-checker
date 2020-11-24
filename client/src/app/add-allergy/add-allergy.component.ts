import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Allergy } from '../allergy';
import { AllergyService } from '../allergy.service';

@Component({
  selector: 'app-add-allergy',
  templateUrl: './add-allergy.component.html',
  styleUrls: ['./add-allergy.component.scss'],
})
export class AddAllergyComponent implements OnInit {
  constructor(private allergyService: AllergyService) {}
  allergyForm: FormGroup;

  // to control checkbox onInit
  coeliacCheckbox = false;
  vegeterianCheckbox = false;
  veganCheckbox = false;
  pescatarianCheckbox = false;

  ngOnInit(): void {
    // form config
    this.allergyForm = new FormGroup({
      allergy: new FormControl(null, Validators.required),
    });

    this.allergyService.isGroupClicked.forEach((group) => {
      switch (group) {
        case 'coeliac':
          this.coeliacCheckbox = true;
          break;
        case 'vegan':
          this.veganCheckbox = true;
          break;
        case 'vegeterian':
          this.vegeterianCheckbox = true;
          break;
        case 'pescatarian':
          this.pescatarianCheckbox = true;
          break;
        default:
          return;
      }
    });
  }

  onSubmit(): void {
    const newAllergy: Allergy = this.allergyForm.value;
    const { invalid } = this.allergyForm;
    const isNewAllergy = this.allergyService.allergies.every(
      (allergy) => allergy.allergy !== newAllergy.allergy
    );

    if (!invalid && isNewAllergy) {
      this.allergyService.postAllergy(newAllergy).subscribe((allergy) => {
        this.allergyService.addToAllergies([allergy]);
      });
    }
  }

  onClick(event) {
    const { name, checked } = event.target;

    if (name === 'vegan') {
      this.vegeterianCheckbox = checked;
      this.pescatarianCheckbox = checked;
    } else if (name === 'vegeterian') {
      this.pescatarianCheckbox = checked;
    }

    if (checked) {
      this.allergyService.postAllergyGroup(name).subscribe((allergies) => {
        this.allergyService.addToAllergies(allergies);
      });
    } else {
      this.allergyService.deleteAllergyGroup(name);
    }
  }
}
