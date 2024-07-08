import { Component, OnInit } from '@angular/core';

import { WordTranslation } from '../shared/models/WordTranslation.model';
import { WordTranslationService } from '../shared/services/word-translation.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  wordTranslation: WordTranslation;

  constructor(private wordTranslationService: WordTranslationService) {}

  ngOnInit(): void {
    this.wordTranslationService
      .getRandomWordTranslation()
      .subscribe((wordTranslation) => (this.wordTranslation = wordTranslation));
  }
}
