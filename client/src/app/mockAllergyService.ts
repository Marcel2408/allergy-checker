import { Observable, Subject } from "rxjs";

let getMockData = [{id: 1, allergy: 'broccoli'}, {id: 2, allergy: 'potatoe'}];
// let postMockData = 


export function setMockData (value) {
  return getMockData = value;
}

export let mockAllergyService = jasmine.createSpyObj(['getAllergiesFromDB', 'postAllergy', 'addToAllergies']);

mockAllergyService.allergies = [];
mockAllergyService.allergiesChanged = new Subject<void>();

let getResponse = new Observable(sub => sub.next(getMockData));
mockAllergyService.getAllergiesFromDB.and.returnValue(getResponse);

let postResponse = new Observable(sub => sub.next());
mockAllergyService.postAllergy()
mockAllergyService.postAllergy.and.returnValue(postResponse);
