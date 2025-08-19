import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Word,
  WordFilterOptions,
  WordFilterRequest,
  WordWithSense,
} from '../models/word.interface';
import { environment } from 'src/environments/environment';
import { ConjugationTense } from '../models/conjugation-tense.model';

@Injectable({
  providedIn: 'root',
})
export class WordService {
  private readonly WORD = '/word';
  private readonly VERBS = '/allVerbs';
  private readonly CONJGUATION = '/conjugationVerb';
  private readonly PAGINATED = '/paginated';
  private readonly FILTERS_ALL_GET = '/allFilters/';
  private readonly APPLY_FILTERS = '/applyFilters';

  constructor(private http: HttpClient) {}

  /**
   * Get all the words that are verbs
   *
   * @returns Word[]
   */
  getAllVerbs(): Observable<Word[]> {
    return this.http.get<Word[]>(environment.BASE_URL + this.WORD + this.VERBS);
  }

  /**
   * Given a wordSense return a list with the conjugationComplete(regular and irregular) with of all the tenses
   *
   * @param wordSenseId
   * @returns ConjugationTense[]
   */
  getAllConjugationCompleteByWordSenseId(wordSenseId: number) {
    return this.http.get<ConjugationTense[]>(
      environment.BASE_URL +
        this.CONJGUATION +
        '/allComplete/wordSense/' +
        wordSenseId,
    );
  }

  /**
   * Return a page with wordWitSenses, that is a collection of word with their respective wordSense
   *
   * @param pageNumber
   * @param pageSize
   * @return HTTP respond with a List<WordWithSenseDTO>
   */
  getWordWithSensePaginated(
    pageNumber?: number,
    pageSize?: number,
  ): Observable<WordWithSense[]> {
    return this.http.get<WordWithSense[]>(
      environment.BASE_URL +
        this.WORD +
        this.PAGINATED +
        '/' +
        pageNumber +
        '/' +
        pageSize,
    );
  }

  getAllWordFilterOptions(): Observable<WordFilterOptions> {
    return this.http.get<WordFilterOptions>(
      environment.BASE_URL + this.WORD + this.FILTERS_ALL_GET,
    );
  }

  getWordWithSensePaginatedAplyingWordSenseFilter(
    pageNumber: number,
    pageSize: number,
    wordFilterRequest: WordFilterRequest,
  ) {
    return this.http.post<WordWithSense[]>(
      environment.BASE_URL +
        this.WORD +
        this.APPLY_FILTERS +
        this.PAGINATED +
        '/' +
        pageNumber +
        '/' +
        pageSize,
      wordFilterRequest,
    );
  }
}
