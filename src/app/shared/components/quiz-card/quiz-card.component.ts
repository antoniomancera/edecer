import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { WordTranslation } from '../../models/word-translation.model';
import { WordTranslationService } from '../../services/word-translation.service';

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss'],
})
export class QuizCardComponent implements OnInit {
  @Input() wordTranslation: WordTranslation;

  quizzForm!: FormGroup;

  constructor(private wordTranslationService: WordTranslationService) {}

  ngOnInit(): void {
    this.quizzForm = new FormGroup({
      attemptWord: new FormControl(null, [Validators.required]),
    });
  }

  attemptsWordTranslation() {
    let success = false;
    if (
      this.quizzForm.controls.attemptWord.value ===
      this.wordTranslation.wordFr.name
    ) {
      success = true;
    }
    this.wordTranslationService
      .attemptsWordTranslation(
        this.wordTranslation.id,
        this.wordTranslation.phrase.id,
        success,
        1
      )
      .subscribe((word) => {
        this.wordTranslation = word;
      });
  }
}
