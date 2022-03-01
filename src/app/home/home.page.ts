import { Component, OnInit } from '@angular/core';

import { FirebaseServiceService } from '../shared/firebase-service.service';
import { Mot } from '../shared/mot';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor() {}
  ngOnInit(): void {}
}
