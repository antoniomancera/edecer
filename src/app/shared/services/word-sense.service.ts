import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WordSenseFilter } from '../models/word.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WordSenseService {
  private readonly WORD_SENSE = '/wordSense';
  private readonly FILTERS_ALL_GET = '/allFilters/';

  constructor(private http: HttpClient) {}

  getAllWordSenseFilters(): Observable<WordSenseFilter> {
    return this.http.get<WordSenseFilter>(
      environment.BASE_URL + this.WORD_SENSE + this.FILTERS_ALL_GET,
    );
  }
}
