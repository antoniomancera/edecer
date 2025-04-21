import { Phrase } from './phrase.interface';
import { WordSense } from './word.interface';

export class WordTranslation {
  id: number;
  wordSenseFr: WordSense;
  wordSenseSp: WordSense;
  attempts: number;
  successes: number;
}

export interface WordTranslationWithPhrases {
  wordTranslation: WordTranslation;
  phrases: Phrase[];
}
