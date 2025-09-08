import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WordPhraseTranslation } from '../models/word-phrase-translation.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WordPhraseTranslationService {
  private readonly WORD_PHRASE_TRANSLATION = '/wordPhraseTranslation';
  private readonly WORD_SENSES_ALL_GET = '/allByWordSenses';

  constructor(private http: HttpClient) {}

  /**
   * Get all WordTranslation associated to a phraseTranslation of a Deck
   *
   * @param deckId
   * @param phraseTranslationId
   * @return HTTP respond with a List<WordTranslation>
   */
  getAllWordPhraseTranslationByWordSense(
    senseIds: number[]
  ): Observable<WordPhraseTranslation[]> {
    return this.http.post<WordPhraseTranslation[]>(
      environment.BASE_URL +
        this.WORD_PHRASE_TRANSLATION +
        this.WORD_SENSES_ALL_GET,
      senseIds
    );
  }
}
