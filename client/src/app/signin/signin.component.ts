import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor() { }

  signinForm: FormGroup;
  access: string = '';

  ngOnInit(): void {
    // this.signinForm = new FormGroup({
    //   username: new FormControl(null, Validators.required),
    //   password: new FormControl(null, Validators.required)
    // })
  }

  // onSubmit(): void {
  //   const { invalid } = this.signinForm;

  //   this.access = '/allergies';
  // }

}
