import { ConjugationRegularIrregular } from './conjugation-regular-irregular.interface';
import { WordSense } from './word.interface';

export interface ConjugationWordPosition {
  conjugationRegularIrregular: ConjugationRegularIrregular;
  wordSense: WordSense;
  position: number;
}
