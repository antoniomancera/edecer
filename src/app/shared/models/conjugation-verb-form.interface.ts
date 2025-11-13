import { PersonGenderNumber } from './person-gender-number.model';
import { Tense } from './tense.interface';

export interface ConjugationVerbForm {
  personGenderNumber: PersonGenderNumber;
  tense: Tense;
}
