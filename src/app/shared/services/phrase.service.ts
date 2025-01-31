import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { PhraseWithWordTranslations } from '../models/phrase.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PhraseService {
  private readonly PHRASE = '/phrase';
  constructor(private http: HttpClient) {}

  getAllPhrasesWithWordTranslationsByDeck(
    deckId?: number
  ): Observable<PhraseWithWordTranslations[]> {
    return this.http.get<PhraseWithWordTranslations[]>(
      environment.BASE_URL + this.PHRASE + '/' + deckId
    );
  }
}
