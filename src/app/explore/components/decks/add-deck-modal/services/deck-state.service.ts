import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

export enum AddDeckState {
  WORD_SENSE = 'WORD_SENSE',
  PHRASE = 'PHRASE',
  TITLE = 'TITLE',
}

export enum AddOrEdit {
  ADD = 'ADD',
  EDIT = 'EDIT',
}

export const DECK_STATE_ORDER = {
  [AddOrEdit.ADD]: [
    AddDeckState.WORD_SENSE,
    AddDeckState.PHRASE,
    AddDeckState.TITLE,
  ],
  [AddOrEdit.EDIT]: [
    AddDeckState.TITLE,
    AddDeckState.WORD_SENSE,
    AddDeckState.PHRASE,
  ],
} as const;

@Injectable({
  providedIn: 'root',
})
export class DeckStateService {
  private wordSenseIds = new BehaviorSubject<number[]>(null);
  private wordPhraseTranslationIds = new BehaviorSubject<number[]>(null);
  private addDeckState = new BehaviorSubject<AddDeckState>(
    AddDeckState.WORD_SENSE
  );
  private addOrEdit = new BehaviorSubject<AddOrEdit>(AddOrEdit.ADD);
  private addDeckStateIndex = new BehaviorSubject<number>(null);

  getWordSenseIds() {
    return this.wordSenseIds.asObservable();
  }

  getAddDeckState() {
    return this.addDeckState.asObservable();
  }

  getWordPhraseTranslationIds() {
    return this.wordPhraseTranslationIds.asObservable();
  }

  getAddOrEdit() {
    return this.addOrEdit.asObservable();
  }

  getAddDeckStateIndex() {
    return this.addDeckStateIndex.asObservable();
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

  setAddOrEdit(addOrdEdit: AddOrEdit) {
    this.addOrEdit.next(addOrdEdit);
  }

  setAddDeckStateIndex(addDeckStateIndex: number) {
    this.addDeckStateIndex.next(addDeckStateIndex);
  }

  setNextState() {
    const addOrEdit = this.addOrEdit.value;
    const deckState = DECK_STATE_ORDER[addOrEdit];
    const deckStateLength = deckState.length;
    const currentAddDeckStateIndex =
      this.getCurrentAddDeckStateIndexByState(addOrEdit);

    let nextState;
    if (currentAddDeckStateIndex === deckStateLength) {
      nextState = deckState[0];
      this.setAddDeckStateIndex(0);
    } else {
      nextState = deckState[currentAddDeckStateIndex + 1];
      this.setAddDeckStateIndex(currentAddDeckStateIndex + 1);
    }

    this.setAddDeckState(nextState);
  }

  private getCurrentAddDeckStateIndexByState(addOrEdit: AddOrEdit) {
    return DECK_STATE_ORDER[addOrEdit].indexOf(this.addDeckState.value);
  }
}
