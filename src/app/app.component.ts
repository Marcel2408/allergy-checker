
import { Component, OnInit } from '@angular/core';

declare var particlesJS: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent implements OnInit {

  constructor(){}
  ngOnInit(): void{

    particlesJS.load('particles-js', 'assets/particlesjs-config.json', function() {
      console.log('callback - particles.js config loaded');
    });
  }

}
