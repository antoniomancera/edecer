import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stats } from '../models/stats.interface';
import { environment } from 'src/environments/environment';
import { DailyStats } from '../models/daily-stats.interface';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  private readonly STATS = '/stats';
  constructor(private http: HttpClient) {}

  /**
   * Returns a list with the historial of the last week
   *
   * @returns Observable<DailyStats[]>
   */
  getStatsPageInitial(): Observable<DailyStats[]> {
    return this.http.get<DailyStats[]>(environment.BASE_URL + this.STATS);
  }
}
