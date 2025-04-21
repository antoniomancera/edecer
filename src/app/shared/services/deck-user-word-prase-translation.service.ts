import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { WordPhraseTranslation } from '../models/word-phrase-translation.model';
import { environment } from 'src/environments/environment';
import { AttemptResult } from '../models/attempt-result.interface';

@Injectable({
  providedIn: 'root',
})
export class DeckUserWordPraseTranslationService {
  private readonly DECK_USER_WORD_PHRASE = '/deckUserWordPhrase';
  private readonly RANDOM_GET_URL = '/getRandom';
  private readonly ATTEMPTS = '/attempts';

  constructor(private http: HttpClient) {}

  /**
   * Method that returns a word and a phrase, the deck is optional
   *
   * @param deckId
   * @returns HTTP respond with WordPhraseTranslationDTO
   */
  getRandomWordPhraseTranslation(
    deckId: number
  ): Observable<WordPhraseTranslation> {
    return this.http
      .get<WordPhraseTranslation>(
        environment.BASE_URL +
          this.DECK_USER_WORD_PHRASE +
          this.RANDOM_GET_URL +
          '/' +
          deckId
      )
      .pipe(
        map((wordPhraseTranslation) => {
          return this.getWordPhraseTranslationWithParts(wordPhraseTranslation);
        })
      );
  }

  /**
   * Attempt a WordPhraseTranslation, will add an userHistorial depending on the result of the attemps, besides returns a WordTranslation
   * in case of success
   *
   * @param wordPhraseId
   * @param deckId
   * @param attempt
   * @returns HTTP respond with the AttemptResultDTO with result and new WordPhraseTranslation in case of success
   */
  attemptsWordPhraseTranslation(
    wordPhraseId: number,
    deckId: number,
    attempt: string
  ): Observable<AttemptResult> {
    const params = new HttpParams()
      .set('attempt', attempt)
      .set('deckId', deckId);

    return this.http
      .put<AttemptResult>(
        `${environment.BASE_URL}${this.DECK_USER_WORD_PHRASE}${this.ATTEMPTS}/${wordPhraseId}`,
        null,
        { params: params }
      )
      .pipe(
        map((wordTranslation) => {
          if (wordTranslation.hasSuccess) {
            wordTranslation.wordPhraseTranslation =
              this.getWordPhraseTranslationWithParts(
                wordTranslation.wordPhraseTranslation
              );
          }

          return wordTranslation;
        })
      );
  }

  private getWordPhraseTranslationWithParts(
    wordPhraseTranslation: WordPhraseTranslation
  ): WordPhraseTranslation {
    const word = new WordPhraseTranslation(
      wordPhraseTranslation.id,
      wordPhraseTranslation.wordTranslation,
      wordPhraseTranslation.phraseTranslation
    );

    return word.getWordPhraseTranslationWithParts();
  }
}
