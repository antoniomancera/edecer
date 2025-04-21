import { WordPhraseTranslation } from './word-phrase-translation.model';

export interface AttemptResult {
  hasSuccess: boolean;
  wordPhraseTranslation: WordPhraseTranslation;
}
