import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { DeckWordTranslationHistorial } from 'src/app/stats/models/deck-word-translation-historial.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DeckWordTranslationHistorialService {
  //TODO cambiar
  private readonly DECK_WORD_TRANSLATION_HISTORIAL = '/userHistorial';

  constructor(private http: HttpClient) {}

  /**
   * Return all DeckWordTranslationHistorial for a day
   *
   * @param dayMillis
   * @returns Observable<DeckWordTranslationHistorial[]> or an error qith a message and error code
   * that must be translated
   */
  getDeckWordTranslationHistorialByDayMillis(
    dayMillis: number,
  ): Observable<DeckWordTranslationHistorial[]> {
    return this.http.get<DeckWordTranslationHistorial[]>(
      environment.BASE_URL +
        this.DECK_WORD_TRANSLATION_HISTORIAL +
        '/' +
        dayMillis,
    );
  }
}
