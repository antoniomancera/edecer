import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import {
  Phrase,
  PhraseTranslationWithWordTranslations,
} from '../models/phrase.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PhraseService {
  private readonly PHRASE = '/phrase';
  private readonly PAGINATED = '/paginated';

  constructor(private http: HttpClient) {}

  getAllPhrasesWithWordTranslationsByDeck(
    deckId?: number,
  ): Observable<PhraseTranslationWithWordTranslations[]> {
    return this.http.get<PhraseTranslationWithWordTranslations[]>(
      environment.BASE_URL + this.PHRASE + '/' + deckId,
    );
  }

  /**
   * Get the page pageNumber of PhraseDTO with pageSize elements
   *
   * @param pageNumber
   * @param pageSize
   * @returns Phrase[]
   */
  getAllPhrases(pageNumber?: number, pageSize?: number): Observable<Phrase[]> {
    return this.http.get<Phrase[]>(
      environment.BASE_URL +
        this.PHRASE +
        this.PAGINATED +
        '/' +
        pageNumber +
        '/' +
        pageSize,
    );
  }
}
