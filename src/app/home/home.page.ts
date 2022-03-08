import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

import { BOUNCE_IN_LEFT } from 'angular-bounce';
import { first } from 'rxjs/operators';

import { FirebaseService } from '../shared/firebase.service';
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
  probabilityArray: number[] = [];
  id: number;
  constructor(private _firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.getRandomWord();
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

  getWordId() {
    this._firebaseService.getMotId(this.id.toString()).subscribe((data) => {
      this.randomWord = data;
    });
  }

  getRandomWord() {
    this._firebaseService.probabilityJson.subscribe((data) => {
      this.probabilityArray = JSON.parse(data[0][0]);
      this.foundPercentage(
        JSON.parse(data[0][0]),
        0,
        JSON.parse(data[0][0]).length - 1,
        1
      );
      this.getWordId();
    });
  }
  // getRandomWordArray(motArray: Mot[]): Mot {
  //   let motSorted: Mot[] = this.sortArray(motArray);
  //   let mot: Mot = this.getRandomWordSortedArray(motSorted);
  //   return mot;
  // }

  // getRandomWordSortedArray(motArray: Mot[]): Mot {
  //   let word: Mot | undefined;
  //   let randomNumber = Math.random();
  //   if (motArray.length > 1) {
  //     word = this.foundWordPercentage(
  //       motArray,
  //       0,
  //       motArray.length - 1,
  //       randomNumber
  //     );
  //   }

  //   return word;
  // }

  foundPercentage(
    probabilityArray: number[],
    left: number,
    right: number,
    randomNumber: number
  ) {
    if (randomNumber == 1) {
      randomNumber = Math.random();
    }
    let pivot = parseInt(((right + left) / 2).toString());
    if (right - left == 0) {
      this.id = left;
    } else if (right - left == 1) {
      if (probabilityArray[left] > randomNumber) {
        this.id = left;
      } else {
        this.id = right;
      }
    } else if (right - left > 1) {
      if (probabilityArray[pivot] > randomNumber) {
        if (probabilityArray[pivot - 1] < randomNumber) {
          this.id = pivot;
        } else {
          this.foundPercentage(probabilityArray, left, pivot - 1, randomNumber);
        }
      } else {
        if (probabilityArray[pivot + 1] > randomNumber) {
          this.id = pivot + 1;
        } else {
          this.foundPercentage(
            probabilityArray,
            pivot + 1,
            right,
            randomNumber
          );
        }
      }
    }
  }

  // foundWordPercentage(
  //   motArray: Mot[],
  //   left: number,
  //   right: number,
  //   randomNumber: number
  // ): Mot {
  //   let word = motArray[left];
  //   let pivot = parseInt(((right + left) / 2).toString());
  //   if (right - left == 1) {
  //     this.randomWord = word;
  //     return word;
  //   }
  //   if (right - left == 2) {
  //     if (motArray[left].percentage < randomNumber) {
  //       word = motArray[right];
  //     }
  //     this.randomWord = word;
  //     return word;
  //   } else if (right - left > 2) {
  //     if (motArray[pivot].percentage >= randomNumber) {
  //       if (motArray[pivot - 1].percentage < randomNumber) {
  //         word = motArray[pivot];
  //         this.randomWord = word;
  //         return word;
  //       } else {
  //         this.foundWordPercentage(motArray, left, pivot - 1, randomNumber);
  //       }
  //     } else {
  //       this.foundWordPercentage(motArray, pivot + 1, right, randomNumber);
  //     }
  //   }
  // }

  updateMot(word: Mot, tryWord: string) {
    let success: boolean = false;
    if (word.fr.trim() === tryWord.trim()) {
      success = true;
    }
    console.log(word);
    this._firebaseService.updateMot(word, success, word.id.toString());
    this.getRandomWord();
    this.try = '';
  }

  // assignWordRandom() {
  //   this._firebaseService.mots.pipe(first()).subscribe(
  //     (data) => {
  //       this.getRandomWordArray(data);
  //     },
  //     (error) => {
  //       console.error(error);
  //     },
  //     () => {}
  //   );
  // }
}
