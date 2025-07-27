import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

export enum AddDeckState {
  WORD_SENSE = 'WORD_SENSE',
  PHRASE = 'PHRASE',
  TITLE = 'TITLE',
}

@Injectable({
  providedIn: 'root',
})
export class DeckStateService {
  private wordSenseIds = new BehaviorSubject<number[]>(null);
  private wordPhraseTranslationIds = new BehaviorSubject<number[]>(null);
  private addDeckState = new BehaviorSubject<AddDeckState>(
    AddDeckState.WORD_SENSE
  );

  getWordSenseIds() {
    return this.wordSenseIds.asObservable();
  }

  getAddDeckState() {
    return this.addDeckState.asObservable();
  }

  getWordPhraseTranslationIds() {
    return this.wordPhraseTranslationIds.asObservable();
  }

  setWordSenseIds(wordSenseIds: number[]) {
    this.wordSenseIds.next(wordSenseIds);
  }

  setAddDeckState(addDeckState: AddDeckState) {
    this.addDeckState.next(addDeckState);
  }

  setWordPhraseTranslationIds(phraseTranslationIds: number[]) {
    this.wordPhraseTranslationIds.next(phraseTranslationIds);
  }
}
