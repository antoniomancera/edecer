import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { SettingsOptions } from '../models/settings-options.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private readonly settings = '/settings';

  constructor(private http: HttpClient) {}

  /**
   * Get all the settings options availables
   *
   * @return HTTP respond with SettingsOptionsDTO
   */
  getSettingsOptions(): Observable<SettingsOptions> {
    return this.http.get<SettingsOptions>(environment.BASE_URL + this.settings);
  }
}
