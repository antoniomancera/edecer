import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

import { BOUNCE_IN_LEFT } from 'angular-bounce';
import { first } from 'rxjs/operators';

import { FirebaseServiceService } from '../shared/firebase-service.service';
import { Mot } from '../shared/mot';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  animations: [
    trigger('heroState', [
      transition('* <=> void', [useAnimation(BOUNCE_IN_LEFT)]),
    ]),
    trigger('success', [
      transition('* <=> success', [useAnimation(BOUNCE_IN_LEFT)]),
    ]),
  ],
})
export class HomePage implements OnInit {
  randomWord: Mot;
  try: string = '';

  constructor(private prueba: FirebaseServiceService) {}

  ngOnInit(): void {
    this.assignWordRandom();
  }

  objectsAreSame(x, y) {
    var objectsAreSame = true;
    for (var propertyName in x) {
      if (x[propertyName] !== y[propertyName]) {
        objectsAreSame = false;
        break;
      }
    }
    return objectsAreSame;
  }

  sortArray(mots: Mot[]): Mot[] {
    return mots.sort(function (a, b) {
      return a.id - b.id || a.es.localeCompare(b.es);
    });
  }

  getRandomWordArray(motArray: Mot[]): Mot {
    let motSorted: Mot[] = this.sortArray(motArray);
    let mot: Mot = this.getRandomWordSortedArray(motSorted);
    return mot;
  }

  getRandomWordSortedArray(motArray: Mot[]): Mot {
    let word: Mot | undefined;
    let randomNumber = Math.random();
    if (motArray.length > 1) {
      word = this.foundWordPercentage(
        motArray,
        0,
        motArray.length - 1,
        randomNumber
      );
    }

    return word;
  }

  foundWordPercentage(
    motArray: Mot[],
    left: number,
    right: number,
    randomNumber: number
  ): Mot {
    let word = motArray[left];
    let pivot = parseInt(((right + left) / 2).toString());
    if (right - left == 1) {
      this.randomWord = word;
      return word;
    }
    if (right - left == 2) {
      if (motArray[left].percentage < randomNumber) {
        word = motArray[right];
      }
      this.randomWord = word;
      return word;
    } else if (right - left > 2) {
      if (motArray[pivot].percentage >= randomNumber) {
        if (motArray[pivot - 1].percentage < randomNumber) {
          word = motArray[pivot];
          this.randomWord = word;
          return word;
        } else {
          this.foundWordPercentage(motArray, left, pivot - 1, randomNumber);
        }
      } else {
        this.foundWordPercentage(motArray, pivot + 1, right, randomNumber);
      }
    }
  }

  updateMot(word: Mot, tryWord: string) {
    let success: boolean = false;
    if (word.fr.trim() === tryWord.trim()) {
      success = true;
    }
    this.prueba.updateMot(word, success, word.id.toString());
    this.assignWordRandom();
    this.try = '';
  }

  assignWordRandom() {
    this.prueba.mots.pipe(first()).subscribe(
      (data) => {
        this.getRandomWordArray(data);
      },
      (error) => {
        console.error(error);
      },
      () => {}
    );
  }
}
