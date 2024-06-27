import {
  sequence,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';

import { BOUNCE_IN_LEFT, BOUNCE_OUT_DOWN, HINGE, TADA } from 'angular-bounce';
import { first } from 'rxjs/operators';


import { Mot } from '../shared/models/Mot.model';
import { MotPalabraService } from '../shared/services/mot-palabra.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  animations: [
    trigger('heroState', [
      transition('* => active', [useAnimation(BOUNCE_IN_LEFT)]),
      transition('* => correct', [useAnimation(TADA)]),
      transition('* => incorrect', [useAnimation(HINGE)]),
    ]),
  ],
})
export class HomePage implements OnInit {
  randomWord: Mot;
  try: string = '';
  probabilityArray: number[] = [];
  id: number;
  state: string = '';
  success: boolean;
  isFirst: boolean = true; 

  constructor(private motPalabraService: MotPalabraService) {}

  ngOnInit(): void {
    this.state = 'inactive';
    // this.getRandomWord();
    this.motPalabraService.getRandomMotPalabra().subscribe((data)=>console.log(data))
  }

  getWordId() {

  }

  getRandomWord() {
   
  }

 

  animationDone($event) {
    console.log(event)
    this.state = $event.toState;

    if (this.state === 'correct' || this.state === 'incorrect') {
      this.state = 'inactive';
    }
    if (this.state === 'inactive') {
      this.getRandomWord();
    }
  }

  
}
