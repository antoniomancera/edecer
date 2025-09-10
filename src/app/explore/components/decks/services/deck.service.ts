import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  private readonly DECK = '/deck';
  private readonly IS_DECK_LIMIT_NOT_REACHED = '/isDeckLimitNotReached';

  constructor(private http: HttpClient) {}

  /**
   * Get if the user has reached the  of decks already in use
   *
   * @return HTTP respond with a boolean
   */
  isDeckLimitNotReached(): Observable<boolean> {
    return this.http.get<boolean>(
      environment.BASE_URL + this.DECK + this.IS_DECK_LIMIT_NOT_REACHED,
    );
  }
}
