import { Component, Input, OnInit } from '@angular/core';

import { WordTranslation } from '../../models/WordTranslation.model';
import { WordTranslationService } from '../../services/word-translation.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
    console.log(this.quizzForm.controls.attemptWord.value);
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
        success
      )
      .subscribe((word) => {
        this.wordTranslation = word;
      });
  }
}
