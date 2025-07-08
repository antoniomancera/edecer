import { ConjugationWordPosition } from './conjugation-word-position.interface';
import { Tense } from './tense.interface';

export class ConjugationTense {
  tense: Tense;
  personGenderNumberConjugation: { [key: string]: ConjugationWordPosition[] };

  constructor(
    tense: Tense,
    personGenderNumberConjugation: { [key: string]: ConjugationWordPosition[] }
  ) {
    this.tense = tense;
    this.personGenderNumberConjugation = personGenderNumberConjugation;
  }

  static getPersonGenderNumberConjugationEntries(personGenderNumberConjugation: {
    [key: string]: ConjugationWordPosition[];
  }): [string, ConjugationWordPosition[]][] {
    return Object.entries(personGenderNumberConjugation || {});
  }

  static getPersonGenderNumberConjugationValues(personGenderNumberConjugation: {
    [key: string]: ConjugationWordPosition[];
  }): ConjugationWordPosition[][] {
    return Object.values(personGenderNumberConjugation || {});
  }

  static getConjugationTensesByMode(
    conjugationTenses: ConjugationTense[],
    mode: string
  ) {
    return conjugationTenses.filter((conjuTense) => {
      return conjuTense.tense.mood?.name === mode;
    });
  }
}
