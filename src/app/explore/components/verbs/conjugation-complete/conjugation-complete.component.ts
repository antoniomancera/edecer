import { Component, Input, OnInit } from '@angular/core';

import { VERB_MODES } from 'src/app/shared/constants/app.constants';
import { ConjugationTense } from 'src/app/shared/models/conjugation-tense.model';
import { WordService } from 'src/app/shared/services/word.service';

@Component({
  selector: 'app-conjugation-complete',
  templateUrl: './conjugation-complete.component.html',
  styleUrls: ['./conjugation-complete.component.scss'],
})
export class ConjugationCompleteComponent implements OnInit {
  @Input() verbId = 0;

  isLoading = true;
  conjugationComplete: ConjugationTense[] = [];

  conjugationIndicative: ConjugationTense[] = [];
  conjugationSubjunctive: ConjugationTense[] = [];
  conjugationConditional: ConjugationTense[] = [];
  conjugationImperative: ConjugationTense[] = [];
  conjugationImpersonal: ConjugationTense[] = [];

  prueba: ConjugationTense = null;

  constructor(private wordService: WordService) {}

  ngOnInit() {
    this.wordService
      .getAllConjugationCompleteByWordSenseId(this.verbId)
      .subscribe({
        next: (conjugation) => {
          this.conjugationIndicative =
            ConjugationTense.getConjugationTensesByMode(
              conjugation,
              VERB_MODES.INDICATIVE
            );
          this.prueba = this.conjugationIndicative[0];

          this.conjugationSubjunctive =
            ConjugationTense.getConjugationTensesByMode(
              conjugation,
              VERB_MODES.SUBJUNCTIVE
            );

          this.conjugationConditional =
            ConjugationTense.getConjugationTensesByMode(
              conjugation,
              VERB_MODES.CONDITIONAL
            );

          this.conjugationImperative =
            ConjugationTense.getConjugationTensesByMode(
              conjugation,
              VERB_MODES.IMPERATIVE
            );

          this.conjugationImpersonal = conjugation.filter(
            (conju) => !conju.tense.mood
          );
          this.isLoading = false;
        },
      });
  }
}
