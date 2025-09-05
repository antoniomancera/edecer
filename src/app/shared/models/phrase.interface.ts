import { Language } from './language.interface';
import { WordTranslation } from './word-translation.model';

export interface Phrase {
  phrase: string;
  language: Language;
}

export interface PhraseWithWordTranslations {
  phrase: Phrase;
  wordTranslations: WordTranslation[];
}
