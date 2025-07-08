import { Component, Input, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { transition, trigger, useAnimation } from '@angular/animations';

import {
  HINGE,
  TADA,
  ZOOM_IN,
} from '../../shared/constants/animations.constants';
import { ToastService } from 'src/app/shared/services/toast.service';
import { WordPhraseTranslation } from 'src/app/shared/models/word-phrase-translation.model';
import { DeckWordPhraseTranslationService } from 'src/app/shared/services/deck-word-phrase-translation.service';

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
  wordPhraseTranslation: WordPhraseTranslation;
  isLoading = false;

  isAttemptCorrect = false;
  isAttemptIncorrect = false;
  hasChangedDeck = false;

  constructor(
    private deckWordPhraseTranslationService: DeckWordPhraseTranslationService,
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
    this.getRandomWordPhraseTranslation();
  }

  getRandomWordPhraseTranslation() {
    this.deckWordPhraseTranslationService
      .getRandomWordPhraseTranslation(this.selectedDeckId)
      .subscribe({
        next: (wordPhraseTranslation) => {
          this.wordPhraseTranslation = wordPhraseTranslation;
          this.hasChangedDeck = true;

          setTimeout(() => (this.hasChangedDeck = false));
        },
        error: (err) => this.toastService.showDangerToast(err.error.message),
      });
  }

  attemptsWordPhraseTranslation() {
    this.isLoading = true;

    this.deckWordPhraseTranslationService
      .attemptsWordPhraseTranslation(
        this.wordPhraseTranslation.id,
        this.selectedDeckId ? this.selectedDeckId : 1,
        this.quizzForm.controls.attemptWord.value
      )
      .subscribe({
        next: (word) => {
          console.log(word);
          if (word.hasSuccess) {
            this.isAttemptCorrect = true;
            setTimeout(() => {
              this.isAttemptCorrect = false;
              this.setWordPhraseTranslation(word.wordPhraseTranslation);
            });
          } else {
            this.isAttemptIncorrect = true;
            setTimeout(() => {
              this.isAttemptIncorrect = false;
            });
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.toastService.showDangerToast(err.error.message);
        },
      });
  }

  private setWordPhraseTranslation(word: WordPhraseTranslation) {
    this.wordPhraseTranslation = word;
    this.isLoading = false;
  }

  private noWhitespaceValidator(control: FormControl) {
    return (control.value || '').trim().length ? null : { whitespace: true };
  }
}
