import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { WordTranslation } from '../../models/word-translation.model';
import { WordTranslationService } from '../../services/word-translation.service';
import { Deck } from '../../models/deck.interface';

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
})
export class QuizCardComponent implements OnInit {
  @Input() wordTranslation: WordTranslation;
  @Input() selectedDeckId: number = 0;

  quizzForm!: FormGroup;
  isLoading = false;

  constructor(private wordTranslationService: WordTranslationService) {}

  ngOnInit(): void {
    this.quizzForm = new FormGroup({
      attemptWord: new FormControl(null, [Validators.required]),
    });
  }

  attemptsWordTranslation() {
    let success = false;
    this.isLoading = true;
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
        this.selectedDeckId
      )
      .subscribe({
        next: (word) => {
          this.wordTranslation = word;
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
        },
      });
  }
}
