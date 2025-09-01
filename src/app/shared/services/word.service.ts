import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Word,
  WordSenseInfoWithoutWord,
  WordWithAttemptsAndSuccess,
} from '../models/word.interface';
import { environment } from 'src/environments/environment';
import { ConjugationTense } from '../models/conjugation-tense.model';
import {
  transformWordFilterRequestToWordSenseFilterRequest,
  WordFilterOptions,
  WordFilterRequest,
  WordSenseFilterRequest,
} from '../models/word-filter.model';

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
  private readonly WITH_ATTEMPTS_AND_SUCCESS = '/withAttemptsAndSuccesses';
  private readonly WORD_SENSE_INFO = '/wordSenseInfo';

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
   * Get a list with all the parameters availables to filter for word and wordSense, that are;
   * for all level, category, part of speech; for part of speech variables  person, gender, number;
   * and finally for part of speech with conjugation mood and tense
   *
   * @return HTTP respond with WordFilterOptionsDTO
   */
  getAllWordFilterOptions(): Observable<WordFilterOptions> {
    return this.http.get<WordFilterOptions>(
      environment.BASE_URL + this.WORD + this.FILTERS_ALL_GET,
    );
  }

  /**
   * Call getWordWithAttemptsAndSuccessesPaginatedAplyingWordFilter if have any filter, or
   * on the contrary call to getWordWithAttemptsAndSuccessesPaginated
   *
   * @param pageNumber
   * @param pageSize
   * @param optional wordFilterRequest
   * @return HTTP respond with a List<WordWithAttemptsAndSuccessDTO>
   */
  getWordWithAttemptsAndSuccessesPaginatedAplyingWordFilterIfExists(
    pageNumber: number,
    pageSize: number,
    wordFilterRequest?: WordFilterRequest,
  ) {
    if (wordFilterRequest) {
      return this.getWordWithAttemptsAndSuccessesPaginatedAplyingWordFilter(
        pageNumber,
        pageSize,
        wordFilterRequest,
      );
    }

    return this.getWordWithAttemptsAndSuccessesPaginated(pageNumber, pageSize);
  }

  /**
   * Returns a page of WordWithAttemptsAndSuccess applying filter if exists, that is a list of Words with their number
   * of attempts and accuracy
   *
   * @param pageNumber
   * @param pageSize
   * @param wordFilterRequest
   * @return HTTP respond with a List<WordWithAttemptsAndSuccessDTO>
   */
  private getWordWithAttemptsAndSuccessesPaginatedAplyingWordFilter(
    pageNumber: number,
    pageSize: number,
    wordFilterRequest: WordFilterRequest,
  ) {
    return this.http.post<WordWithAttemptsAndSuccess[]>(
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

  /**
   * Returns a page of WordWithAttemptsAndSuccess, that is a list of Words with their number
   * of attempts and accuracy
   *
   * @param pageNumber
   * @param pageSize
   * @return HTTP respond with a List<WordWithAttemptsAndSuccessDTO>
   */
  private getWordWithAttemptsAndSuccessesPaginated(
    pageNumber: number,
    pageSize: number,
  ): Observable<WordWithAttemptsAndSuccess[]> {
    return this.http.get<WordWithAttemptsAndSuccess[]>(
      environment.BASE_URL +
        this.WORD +
        this.WITH_ATTEMPTS_AND_SUCCESS +
        this.PAGINATED +
        '/' +
        pageNumber +
        '/' +
        pageSize,
    );
  }

  /**
   * Call getWordSenseInfosWithoutWordByWordIdAplyingWordSenseFilters if have filters, or
   * on the contrary call getWordSenseInfosWithoutWordByWordId
   *
   * @param wordId
   * @param optional wordSenseFilterRequest
   * @return HTTP respond with a List<WordSenseInfoWithoutWordDTO>
   */
  getWordSenseInfosWithoutWordByWordIdAplyingWordSenseFiltersIfExists(
    wordId: number,
    wordSenseFilterRequest?: WordSenseFilterRequest,
  ) {
    if (wordSenseFilterRequest) {
      return this.getWordSenseInfosWithoutWordByWordIdAplyingWordSenseFilters(
        wordId,
        transformWordFilterRequestToWordSenseFilterRequest(
          wordSenseFilterRequest,
        ),
      );
    }

    return this.getWordSenseInfosWithoutWordByWordId(wordId);
  }

  /**
   * Get the senses with Info of a word
   *
   * @param wordId
   * @return HTTP respond with a List<WordSenseInfoWithoutWordDTO>
   */
  private getWordSenseInfosWithoutWordByWordId(
    wordId: number,
  ): Observable<WordSenseInfoWithoutWord[]> {
    return this.http.get<WordSenseInfoWithoutWord[]>(
      environment.BASE_URL + this.WORD + this.WORD_SENSE_INFO + '/' + wordId,
    );
  }

  /**
   * Get the senses with Info of a word on applying filters if exists
   *
   * @param wordId
   * @param wordSenseFilterRequest
   * @return HTTP respond with a List<WordSenseInfoWithoutWordDTO>
   */
  private getWordSenseInfosWithoutWordByWordIdAplyingWordSenseFilters(
    wordId: number,
    wordSenseFilterRequest: WordSenseFilterRequest,
  ): Observable<WordSenseInfoWithoutWord[]> {
    return this.http.post<WordSenseInfoWithoutWord[]>(
      environment.BASE_URL +
        this.WORD +
        this.WORD_SENSE_INFO +
        this.APPLY_FILTERS +
        '/' +
        wordId,
      wordSenseFilterRequest,
    );
  }
}
