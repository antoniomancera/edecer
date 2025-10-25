import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Deck } from 'src/app/shared/models/deck.interface';
import { environment } from 'src/environments/environment';
import { CreationOptionsAvailable } from '../models/creation-options-available.model';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  private readonly DECK = '/deck';
  private readonly IS_DECK_LIMIT_NOT_REACHED = '/isDeckLimitNotReached';
  private readonly IS_DECK_CREATION_OPTIONS = '/isDeckCreationOptionsAvailable';

  constructor(private http: HttpClient) {}

  /**
   * Get if the user has reached the  of decks already in use
   *
   * @return HTTP respond with a boolean
   */
  isDeckLimitNotReached(): Observable<boolean> {
    return this.http.get<boolean>(
      environment.BASE_URL + this.DECK + this.IS_DECK_LIMIT_NOT_REACHED,
    );
  }

  /**
   * After clicking in remove a deck, the endDate is updated
   *
   * @param deckId
   * @return HTTP respond with the updated Deck
   */
  updateDeckEndDate(deckId: number): Observable<Deck> {
    return this.http.patch<Deck>(
      environment.BASE_URL + this.DECK + '/' + deckId,
      {},
    );
  }

  /**
   * Get all active decks by user
   *
   * @return HTTP respond with the active decks
   */
  getActiveDecks(): Observable<Deck[]> {
    return this.http.get<Deck[]>(environment.BASE_URL + this.DECK);
  }

  /**
   * Return if is possible to create a new Deck o to recycle one already removed
   *
   * @returns CreationOptionsAvailable
   */
  isDeckCreationOptionsAvailable(): Observable<CreationOptionsAvailable> {
    return this.http.get<CreationOptionsAvailable>(
      environment.BASE_URL + this.DECK + this.IS_DECK_CREATION_OPTIONS,
    );
  }
}
