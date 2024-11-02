import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Home } from '../models/home.interface';
import { environment } from 'src/environments/environment';
import { Goal } from '../models/goal.interface';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private readonly HOME = '/home';
  private readonly GOAL = '/goal';

  constructor(private http: HttpClient) {}

  getHome(): Observable<Home> {
    return this.http.get<Home>(environment.BASE_URL + this.HOME);
  }

  createGoal(goal: Goal): Observable<Goal> {
    return this.http.post<Goal>(environment.BASE_URL + this.GOAL, goal);
  }
}
