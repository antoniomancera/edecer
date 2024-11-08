import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { WordTranslation } from '../models/word-translation.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WordTranslationService {
  private readonly MOT_PALABRA = '/wordTranslation';
  private readonly GET_RANDOM = '/getRandom';
  private readonly ATTEMPS = '/attempts';

  constructor(private http: HttpClient) {}

  getRandomWordTranslation(): Observable<WordTranslation> {
    return this.http
      .get<WordTranslation>(
        environment.BASE_URL + this.MOT_PALABRA + this.GET_RANDOM
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
