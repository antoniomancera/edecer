import { Component, OnInit } from '@angular/core';

import { MotPalabraService } from '../shared/services/mot-palabra.service';
import { MotPalabra } from '../shared/models/MotPalabra.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  motPalabra: MotPalabra;

  constructor(private motPalabraService: MotPalabraService) {}

  ngOnInit(): void {
    this.motPalabraService
      .getRandomMotPalabra()
      .subscribe((motPalabra) => (this.motPalabra = motPalabra));
  }
}
