import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Deck } from '../models/deck.interface';
import { Home } from 'src/app/home/models/home.interface';

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  // private decks = new BehaviorSubject<Deck[]>(null);
  // private lastDeck = new BehaviorSubject<Deck>(null);
  private home = new BehaviorSubject<Home>(null);

  getHome() {
    return this.home.asObservable();
  }

  setHome(home: Home) {
    this.home.next(home);
  }

  // getLastDeck() {
  //   return this.lastDeck.asObservable();
  // }

  // setLastDeck(deck: Deck) {
  //   this.lastDeck.next(deck);
  // }

  // getDecks() {
  //   return this.decks.asObservable();
  // }

  // setDecks(decks: Deck[]) {
  //   return this.decks.next(decks);
  // }
}
