import { PhraseTranslation } from './phrase-translation.interface';
import { Phrase } from './phrase.interface';
import { WordSense } from './word.interface';

export class WordTranslation {
  id: number;
  wordSenseFr: WordSense;
  wordSenseSp: WordSense;
  attempts: number;
  successes: number;
}

export interface WordTranslationWithPhraseTranslations {
  wordTranslation: WordTranslation;
  phraseTranslations: PhraseTranslation[];
}
