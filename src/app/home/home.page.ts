import { Component, OnInit } from '@angular/core';
import { FirebaseServiceService } from '../shared/firebase-service.service';
import { Mot } from '../shared/mot';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  p1: Mot[] = [];
  p2: number[] = [];
  constructor(private pruea: FirebaseServiceService) {}
  ngOnInit(): void {
    this.pruea.percentage.subscribe((data) => (this.p2 = data));
  }

  p() {
    this.pruea.getDatabase();
  }
}
