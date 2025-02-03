import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stats } from '../models/stats.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  private readonly STATS = '/stats';
  constructor(private http: HttpClient) {}

  getStatsPageInitial(): Observable<Stats> {
    return this.http.get<Stats>(environment.BASE_URL + this.STATS);
  }
}
