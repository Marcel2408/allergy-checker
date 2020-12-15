import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }
  isLoading = true;

  ngOnInit(): void {
    setTimeout(() => this.isLoading = false, 2000);
  }


}
