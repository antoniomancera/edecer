import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { WordPhraseTranslation } from '../models/word-phrase-translation.model';
import { environment } from 'src/environments/environment';
import { AttemptResult } from '../models/attempt-result.interface';
import {
  WordSenseInfoWithoutWord,
  WordWithAttemptsAndSuccess,
} from '../models/word.interface';
import { DeckEditInitInfo } from 'src/app/explore/components/decks/add-deck-modal/models/deck-edit-init-info.model';

@Injectable({
  providedIn: 'root',
})
export class DeckWordPhraseTranslationService {
  private readonly DECK_WORD_PHRASE = '/deckWordPhrase';
  private readonly RANDOM_GET_URL = '/getRandom';
  private readonly ATTEMPTS = '/attempts';
  private readonly ADD = '/add';
  private readonly PAGINATED = '/paginated';
  private readonly WORDS_WITH_ATTEMPTS_SUCCESSES_GET =
    '/wordsWithAttemptsAndSuccesses';
  private readonly WORD_SENSE_INFO = '/wordSenseInfo';
  private readonly DECK_EDIT_INIT = '/deckEditInit';

  constructor(private http: HttpClient) {}

  /**
   * Method that returns a word and a phrase, the deck is optional
   *
   * @param deckId
   * @returns HTTP respond with WordPhraseTranslationDTO
   */
  getRandomWordPhraseTranslation(
    deckId: number,
  ): Observable<WordPhraseTranslation> {
    return this.http
      .get<WordPhraseTranslation>(
        environment.BASE_URL +
          this.DECK_WORD_PHRASE +
          this.RANDOM_GET_URL +
          '/' +
          deckId,
      )
      .pipe(
        map((wordPhraseTranslation) => {
          return this.getWordPhraseTranslationWithParts(wordPhraseTranslation);
        }),
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
    attempt: string,
  ): Observable<AttemptResult> {
    const params = new HttpParams()
      .set('attempt', attempt)
      .set('deckId', deckId);

    return this.http
      .put<AttemptResult>(
        `${environment.BASE_URL}${this.DECK_WORD_PHRASE}${this.ATTEMPTS}/${wordPhraseId}`,
        null,
        { params: params },
      )
      .pipe(
        map((wordTranslation) => {
          if (wordTranslation.hasSuccess) {
            wordTranslation.wordPhraseTranslation =
              this.getWordPhraseTranslationWithParts(
                wordTranslation.wordPhraseTranslation,
              );
          }

          return wordTranslation;
        }),
      );
  }

  /**
   * Create a deck with a name and a description, besides, a list of deckWordPhraseTranslation is created linked
   * to the deck
   *
   * @param request
   * @return HTTP respond with the DeckDTO created
   * @throws WordPhraseTranslationNotFoundException if any wordPhraseTranslation is not found
   */
  createDeckWithWordPhraseTranslation(
    name: string,
    description: string,
    wordPhraseTranslationIds: number[],
  ) {
    return this.http.post<WordPhraseTranslation>(
      environment.BASE_URL + this.DECK_WORD_PHRASE + this.ADD,
      {
        name: name,
        description: description,
        wordPhraseTranslationIds: wordPhraseTranslationIds,
      },
    );
  }

  getWordsWithAttemptsAndSuccessPaginatedByDeckId(
    deckId: number,
    pageNumber: number,
    pageSize: number,
  ) {
    return this.http.get<WordWithAttemptsAndSuccess[]>(
      environment.BASE_URL +
        this.DECK_WORD_PHRASE +
        this.WORDS_WITH_ATTEMPTS_SUCCESSES_GET +
        this.PAGINATED +
        '/' +
        deckId +
        '/' +
        pageNumber +
        '/' +
        pageSize,
    );
  }

  getWordSenseInfosWithoutWordByWordIdAndDeckId(
    deckId: number,
    wordId: number,
  ) {
    return this.http.get<WordSenseInfoWithoutWord[]>(
      environment.BASE_URL +
        this.DECK_WORD_PHRASE +
        this.WORD_SENSE_INFO +
        '/' +
        deckId +
        '/' +
        wordId,
    );
  }

  getDeckEditInit(
    deckId: number,
    pageSize: number,
  ): Observable<DeckEditInitInfo> {
    return this.http.get<DeckEditInitInfo>(
      environment.BASE_URL +
        this.DECK_WORD_PHRASE +
        this.DECK_EDIT_INIT +
        '/' +
        deckId +
        '/' +
        pageSize,
    );
  }

  private getWordPhraseTranslationWithParts(
    wordPhraseTranslation: WordPhraseTranslation,
  ): WordPhraseTranslation {
    const word = new WordPhraseTranslation(
      wordPhraseTranslation.id,
      wordPhraseTranslation.wordTranslation,
      wordPhraseTranslation.phraseTranslation,
    );

    return word.getWordPhraseTranslationWithParts();
  }
}
