import { WordTranslation } from 'src/app/shared/models/word-translation.model';

export interface DeckWordTranslationHistorial {
  wordTranslation: WordTranslation;
  date: number;
  success: number;
  attempts: number;
  deckId: number;
}
