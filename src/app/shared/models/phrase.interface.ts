import { Language } from './language.interface';
import { PhraseTranslation } from './phrase-translation.interface';
import { WordTranslation } from './word-translation.model';

export interface Phrase {
  phrase: string;
  language: Language;
}

export interface PhraseTranslationWithWordTranslations {
  phrase: PhraseTranslation;
  wordTranslations: WordTranslation[];
}
