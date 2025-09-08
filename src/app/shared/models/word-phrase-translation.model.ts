import { WordTranslation } from './word-translation.model';
import { PhraseTranslation } from './phrase-translation.interface';

export class WordPhraseTranslation {
  id: number;
  wordTranslation: WordTranslation;
  phraseTranslation: PhraseTranslation;
  phraseTargetFirstPart?: string;
  phraseTargetSecondPart?: string;
  globalIndex?: number;

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
      this.phraseTranslation.phraseTarget.phrase.split(
        this.wordTranslation.wordSenseTarget.word.name
      )
    ) {
      const phraseTargetSplit = this.phraseTranslation.phraseTarget.phrase.split(
        this.wordTranslation.wordSenseTarget.word.name
      );
      this.phraseTargetFirstPart = phraseTargetSplit[0];
      this.phraseTargetSecondPart = phraseTargetSplit[1];
    }
    return this;
  }
}
