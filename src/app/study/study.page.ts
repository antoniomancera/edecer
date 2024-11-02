import { Component, OnInit } from '@angular/core';

import { WordTranslation } from '../shared/models/word-translation.model';
import { WordTranslationService } from '../shared/services/word-translation.service';

@Component({
  selector: 'app-study',
  templateUrl: './study.page.html',
  styleUrls: ['./study.page.scss'],
})
export class StudyPage implements OnInit {
  wordTranslation: WordTranslation;

  constructor(private wordTranslationService: WordTranslationService) {}

  ngOnInit(): void {
    this.wordTranslationService
      .getRandomWordTranslation()
      .subscribe((wordTranslation) => (this.wordTranslation = wordTranslation));
  }
}
