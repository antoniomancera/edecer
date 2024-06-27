import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { MotPalabra } from '../models/MotPalabra.model';

@Injectable({
  providedIn: 'root'
})
export class MotPalabraService {
  private BASE_URL = 'http://localhost:8080';
  private MOT_PALABRA = '/motPalabra';
  private GET_RANDOM = '/getRandom';

  constructor(private http: HttpClient) { }

  getRandomMotPalabra(): Observable<MotPalabra> {
    return this.http.get<MotPalabra>(this.BASE_URL+this.MOT_PALABRA+this.GET_RANDOM);
  }
}
