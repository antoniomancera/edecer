import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import {
  WordTranslation,
  WordTranslationWithPhraseTranslations,
} from '../models/word-translation.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WordTranslationService {
  private readonly MOT_PALABRA = '/wordTranslation';
  private readonly PAGINATED = '/paginated';

  constructor(private http: HttpClient) {}

  /**
   * Get All WordTranslation and their Phrases associated given a deck
   *
   * @param deckId
   * @returns Observable<WordTranslationWithPhrases[]>
   */
  getAllWordTranslationWithPhrasesByDeck(
    deckId: number
  ): Observable<WordTranslationWithPhraseTranslations[]> {
    return this.http.get<WordTranslationWithPhraseTranslations[]>(
      environment.BASE_URL + this.MOT_PALABRA + '/' + deckId
    );
  }

  /**
   * Get the page pageNumber of WordTranslationDTO with pageSize elements
   *
   * @param pageNumber
   * @param pageSize
   * @returns Observable<WordTranslation[]>
   */
  getAllWordTranslations(
    pageNumber?: number,
    pageSize?: number
  ): Observable<WordTranslation[]> {
    return this.http.get<WordTranslation[]>(
      environment.BASE_URL +
        this.MOT_PALABRA +
        this.PAGINATED +
        '/' +
        pageNumber +
        '/' +
        pageSize
    );
  }
}
