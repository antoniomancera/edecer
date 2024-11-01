import { Phrase } from './phrase.interface';
import { Word } from './word.interface';

export class WordTranslation {
  id: number;
  wordFr: Word;
  wordFrFirstPart?: string;
  wordFrSecondPart?: string;
  wordSp: Word;
  attempts: number;
  successes: number;
  phrase: Phrase;

  constructor(
    id: number,
    wordFr: Word,
    wordSp: Word,
    attempts: number,
    successes: number,
    phrase: Phrase
  ) {
    this.id = id;
    this.wordFr = wordFr;
    this.wordSp = wordSp;
    this.attempts = attempts;
    this.successes = successes;
    this.phrase = phrase;
  }

  getWordTranslationWitParts(): WordTranslation {
    if (this.phrase.phraseFr.split(this.wordFr.name)) {
      const wordFrSplit = this.phrase.phraseFr.split(this.wordFr.name);
      this.wordFrFirstPart = wordFrSplit[0];
      this.wordFrSecondPart = wordFrSplit[1];
    }
    return this;
  }
}
