import { WordTranslation } from './word-translation.model';
import { PhraseTranslation } from './phrase-translation.interface';

export class WordPhraseTranslation {
  id: number;
  wordTranslation: WordTranslation;
  phraseTranslation: PhraseTranslation;
  phraseFrFirstPart?: string;
  phraseFrSecondPart?: string;

  constructor(
    id: number,
    wordTranslation: WordTranslation,
    phraseTranslation: PhraseTranslation
  ) {
    this.id = id;
    this.wordTranslation = wordTranslation;
    this.phraseTranslation = phraseTranslation;
  }

  getWordPhraseTranslationWithParts(): WordPhraseTranslation {
    if (
      this.phraseTranslation.phraseFr.split(
        this.wordTranslation.wordSenseFr.word.name
      )
    ) {
      const phraseFrSplit = this.phraseTranslation.phraseFr.split(
        this.wordTranslation.wordSenseFr.word.name
      );
      this.phraseFrFirstPart = phraseFrSplit[0];
      this.phraseFrSecondPart = phraseFrSplit[1];
    }
    return this;
  }
}
