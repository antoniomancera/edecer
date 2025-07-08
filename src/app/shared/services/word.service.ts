import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Word } from '../models/word.interface';
import { environment } from 'src/environments/environment';
import { ConjugationTense } from '../models/conjugation-tense.model';

@Injectable({
  providedIn: 'root',
})
export class WordService {
  private readonly WORD = '/word';
  private readonly VERBS = '/allVerbs';
  private readonly CONJGUATION = '/conjugationVerb';

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
        wordSenseId
    );
  }
}
