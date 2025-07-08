import { Pipe, PipeTransform } from '@angular/core';

import { PERSONAL_PRONOUNS_FRENCH } from '../constants/app.constants';
import { ConjugationWordPosition } from '../models/conjugation-word-position.interface';

@Pipe({
  name: 'conjugationTensePronoun',
})
export class ConjugationTensePronounPipe implements PipeTransform {
  transform(
    conjugationWordPositions: [string, ConjugationWordPosition[]]
  ): string {
    return (
      this.getPronoun(conjugationWordPositions[0]) +
      ' ' +
      this.getConjugation(conjugationWordPositions[1])
    );
  }

  private getPronoun(personGenderNumberEnum: string): string {
    return PERSONAL_PRONOUNS_FRENCH[personGenderNumberEnum];
  }

  private getConjugation(conjugationWordPosition: ConjugationWordPosition[]) {
    let conjugation = '';
    conjugationWordPosition.sort((a, b) => a.position - b.position);
    conjugationWordPosition.map((conju) => {
      if (conju.wordSense) {
        conjugation += conju.wordSense?.word.name;
      } else if (
        conju.conjugationRegularIrregular?.conjugationRegular &&
        conju.conjugationRegularIrregular?.conjugationIrregular
      ) {
        conjugation += conju.conjugationRegularIrregular.conjugationIrregular;
      } else if (
        !conju.conjugationRegularIrregular?.conjugationRegular &&
        conju.conjugationRegularIrregular?.conjugationIrregular
      ) {
        conjugation += conju.conjugationRegularIrregular.conjugationRegular;
      } else if (
        conju.conjugationRegularIrregular?.conjugationRegular &&
        !conju.conjugationRegularIrregular?.conjugationIrregular
      ) {
        conjugation += conju.conjugationRegularIrregular.conjugationIrregular;
      }
    });

    return conjugation;
  }
}
