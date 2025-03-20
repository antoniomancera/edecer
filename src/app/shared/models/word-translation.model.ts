import { Phrase } from './phrase.interface';
import { WordSense } from './word.interface';

export class WordTranslation {
  id: number;
  wordSenseFr: WordSense;
  wordFrFirstPart?: string;
  wordFrSecondPart?: string;
  wordSenseSp: WordSense;
  attempts: number;
  successes: number;
  phrase: Phrase;

  constructor(
    id: number,
    wordSenseFr: WordSense,
    wordSenseSp: WordSense,
    attempts: number,
    successes: number,
    phrase: Phrase
  ) {
    this.id = id;
    this.wordSenseFr = wordSenseFr;
    this.wordSenseSp = wordSenseSp;
    this.attempts = attempts;
    this.successes = successes;
    this.phrase = phrase;
  }

  getWordTranslationWitParts(): WordTranslation {
    if (this.phrase.phraseFr.split(this.wordSenseFr.wordFr.name)) {
      const wordFrSplit = this.phrase.phraseFr.split(
        this.wordSenseFr.wordFr.name
      );
      this.wordFrFirstPart = wordFrSplit[0];
      this.wordFrSecondPart = wordFrSplit[1];
    }
    return this;
  }
}

export interface WordTranslationWithPhrases {
  wordTranslation: WordTranslation;
  phrases: Phrase[];
}
