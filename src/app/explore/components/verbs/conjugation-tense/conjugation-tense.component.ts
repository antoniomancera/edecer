import { Component, Input, OnInit } from '@angular/core';

import { ConjugationTense } from 'src/app/shared/models/conjugation-tense.model';
import { ConjugationWordPosition } from 'src/app/shared/models/conjugation-word-position.interface';

@Component({
  selector: 'app-conjugation-tense',
  templateUrl: './conjugation-tense.component.html',
  styleUrls: ['./conjugation-tense.component.scss'],
})
export class ConjugationTenseComponent implements OnInit {
  @Input() conjugationTense: ConjugationTense = null;

  conjugationWordPositions: [string, ConjugationWordPosition[]][] = [];

  ngOnInit() {
    this.conjugationWordPositions =
      ConjugationTense.getPersonGenderNumberConjugationEntries(
        this.conjugationTense.personGenderNumberConjugation
      );
  }
}
