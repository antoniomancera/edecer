import { Phrase } from './Phrase.model';
import { Word } from './Word.model';

export interface WordTranslation {
  id: number;
  wordFr: Word;
  wordSp: Word;
  attempts: number;
  successes: number;
  phrase: Phrase;
}
