import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WordTranslation } from '../models/WordTranslation.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WordTranslationService {
  private MOT_PALABRA = '/wordTranslation';
  private GET_RANDOM = '/getRandom';

  constructor(private http: HttpClient) {}

  getRandomWordTranslation(): Observable<WordTranslation> {
    return this.http.get<WordTranslation>(
      environment.BASE_URL + this.MOT_PALABRA + this.GET_RANDOM
    );
  }
}
