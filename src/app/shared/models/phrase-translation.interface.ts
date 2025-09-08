import { Phrase } from './phrase.interface';

export interface PhraseTranslation {
  id: number;
  phraseTarget: Phrase;
  phraseBase: Phrase;
}