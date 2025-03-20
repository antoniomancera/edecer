import { Component, Input, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { transition, trigger, useAnimation } from '@angular/animations';

import { WordTranslation } from '../../shared/models/word-translation.model';
import { WordTranslationService } from '../../shared/services/word-translation.service';
import {
  HINGE,
  TADA,
  ZOOM_IN,
} from '../../shared/constants/animations.constants';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss'],
  animations: [
    trigger('attemptsCorrect', [
      transition('tada => null', [useAnimation(TADA)]),
    ]),
    trigger('attemptsIncorrect', [
      transition('hinge => null', [useAnimation(HINGE)]),
    ]),
    trigger('changeDeck', [
      transition('zoomIn => null', [useAnimation(ZOOM_IN)]),
    ]),
  ],
})
export class QuizCardComponent implements OnChanges {
  @Input() selectedDeckId: number = 0;

  quizzForm!: FormGroup;
  wordTranslation: WordTranslation;
  isLoading = false;

  isAttemptCorrect = false;
  isAttemptIncorrect = false;
  hasChangedDeck = false;

  constructor(
    private wordTranslationService: WordTranslationService,
    private toastService: ToastService
  ) {
    this.quizzForm = new FormGroup({
      attemptWord: new FormControl(null, [
        Validators.required,
        this.noWhitespaceValidator,
      ]),
    });
  }

  ngOnChanges(): void {
    this.getRandomWordTranslation();
  }

  getRandomWordTranslation() {
    this.wordTranslationService
      .getRandomWordTranslation(this.selectedDeckId)
      .subscribe({
        next: (wordTranslation) => {
          this.wordTranslation = wordTranslation;
          this.hasChangedDeck = true;

          setTimeout(() => (this.hasChangedDeck = false));
        },
        error: (err) => this.toastService.showDangerToast(err.error.message),
      });
  }

  attemptsWordTranslation() {
    let success = false;
    this.isLoading = true;
    if (
      this.quizzForm.controls.attemptWord.value ===
      this.wordTranslation.wordSenseFr.wordFr.name
    ) {
      success = true;
    }
    if (success) {
      this.isAttemptCorrect = true;
      setTimeout(() => {
        this.isAttemptCorrect = false;
      });
    } else {
      this.isAttemptIncorrect = true;
      setTimeout(() => {
        this.isAttemptIncorrect = false;
      });
    }
    this.wordTranslationService
      .attemptsWordTranslation(
        this.wordTranslation.id,
        this.wordTranslation.phrase.id,
        success,
        this.selectedDeckId ? this.selectedDeckId : 1
      )
      .subscribe({
        next: (word) => {
          this.wordTranslation = word;
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
          this.toastService.showDangerToast(err.error.message);
        },
      });
  }

  private noWhitespaceValidator(control: FormControl) {
    return (control.value || '').trim().length ? null : { whitespace: true };
  }
}
