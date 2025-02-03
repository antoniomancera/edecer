import { WordTranslation } from './word-translation.model';

export interface WordTranslationHistorial {
  id: number;
  wordTranslation: WordTranslation;
  importanceIndex: number;
  date: number;
  successes: number;
}
