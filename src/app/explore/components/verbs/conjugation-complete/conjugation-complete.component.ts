import { Component, Input, OnInit } from '@angular/core';

import { VERB_MODES } from 'src/app/shared/constants/app.constants';
import { ConjugationTense } from 'src/app/shared/models/conjugation-tense.model';
import { ConjugationOrchestratorService } from 'src/app/shared/services/conjugation/conjugation-orchestrator.service';
import { WordService } from 'src/app/shared/services/word.service';

@Component({
  selector: 'app-conjugation-complete',
  templateUrl: './conjugation-complete.component.html',
  styleUrls: ['./conjugation-complete.component.scss'],
})
export class ConjugationCompleteComponent implements OnInit {
  @Input() verbId = 0;

  isLoading = true;
  conjugationIndicative: ConjugationTense[] = [];
  conjugationSubjunctive: ConjugationTense[] = [];
  conjugationConditional: ConjugationTense[] = [];
  conjugationImperative: ConjugationTense[] = [];
  conjugationImpersonal: ConjugationTense[] = [];

  conjugationComplete: ConjugationTense[] = [];

  constructor(
    private wordService: WordService,
    private conjugationOrchestratorService: ConjugationOrchestratorService,
  ) {}

  ngOnInit() {
    this.wordService
      .getConjugationVerbWithTensesInfoByWordSenseId(this.verbId)
      .subscribe({
        next: (conjugation) => {
          this.conjugationComplete =
            this.conjugationOrchestratorService.getConjugationWordPositionsByConjugationVerbWithTensesInfo(
              conjugation,
            );
          this.conjugationIndicative =
            ConjugationTense.getConjugationTensesByMode(
              this.conjugationComplete,
              VERB_MODES.INDICATIVE,
            );

          this.conjugationSubjunctive =
            ConjugationTense.getConjugationTensesByMode(
              this.conjugationComplete,
              VERB_MODES.SUBJUNCTIVE,
            );

          this.conjugationConditional =
            ConjugationTense.getConjugationTensesByMode(
              this.conjugationComplete,
              VERB_MODES.CONDITIONAL,
            );

          this.conjugationImperative =
            ConjugationTense.getConjugationTensesByMode(
              this.conjugationComplete,
              VERB_MODES.IMPERATIVE,
            );

          this.conjugationImpersonal = this.conjugationComplete.filter(
            (conju) => !conju.tense.mood,
          );
          this.isLoading = false;
        },
      });
  }
}
