import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import {
  WordTranslation,
  WordTranslationWithPhrases,
} from '../models/word-translation.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WordTranslationService {
  private readonly MOT_PALABRA = '/wordTranslation';
  private readonly GET_RANDOM = '/getRandom';
  private readonly ATTEMPS = '/attempts';
  private readonly PAGINATED = '/paginated';

  constructor(private http: HttpClient) {}

  getRandomWordTranslation(deckId?: number): Observable<WordTranslation> {
    return this.http
      .get<WordTranslation>(
        environment.BASE_URL + this.MOT_PALABRA + this.GET_RANDOM + '/' + deckId
      )
      .pipe(
        map((wordTranslation) => {
          return this.getWordTranslationWitParts(wordTranslation);
        })
      );
  }

  attemptsWordTranslation(
    wordId: number,
    phraseId: number,
    success: boolean,
    deckId: number
  ): Observable<WordTranslation> {
    const params = new HttpParams()
      .set('phraseId', phraseId.toString())
      .set('success', success)
      .set('deckId', deckId);

    return this.http
      .put<WordTranslation>(
        `${environment.BASE_URL}${this.MOT_PALABRA}${this.ATTEMPS}/${wordId}`,
        null,
        { params: params }
      )
      .pipe(
        map((wordTranslation) => {
          return this.getWordTranslationWitParts(wordTranslation);
        })
      );
  }

  /**
   * Get All WordTranslation and their Phrases associated given a deck
   *
   * @param deckId
   * @returns Observable<WordTranslationWithPhrases[]>
   */
  getAllWordTranslationWithPhrasesByDeck(
    deckId: number
  ): Observable<WordTranslationWithPhrases[]> {
    return this.http.get<WordTranslationWithPhrases[]>(
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

  private getWordTranslationWitParts(
    wordTranslation: WordTranslation
  ): WordTranslation {
    const word = new WordTranslation(
      wordTranslation.id,
      wordTranslation.wordFr,
      wordTranslation.wordSp,
      wordTranslation.attempts,
      wordTranslation.successes,
      wordTranslation.phrase
    );

    return word.getWordTranslationWitParts();
  }
}
