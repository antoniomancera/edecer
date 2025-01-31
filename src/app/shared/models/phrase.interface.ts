import { WordTranslation } from './word-translation.model';

export interface Phrase {
  id: number;
  phraseEs: string;
  phraseFr: string;
  description: string;
}

export interface PhraseWithWordTranslations {
  phrase: Phrase;
  wordTranslations: WordTranslation[];
}
