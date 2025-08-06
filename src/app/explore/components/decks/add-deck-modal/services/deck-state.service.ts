import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { WordWithSense } from 'src/app/shared/models/word.interface';

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
  private isFirstStep = new BehaviorSubject<boolean>(true);
  private isLastStep = new BehaviorSubject<boolean>(false);
  private wordWithSensesAddWordSensesForm = new BehaviorSubject<
    WordWithSense[]
  >(null);
  private pageNumberAddWordSensesForm = new BehaviorSubject<number>(1);
  private hasMoreWordsAddWordSensesForm = new BehaviorSubject<boolean>(true);

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

  getIsFirstStep() {
    return this.isFirstStep.asObservable();
  }

  getIsLastStep() {
    return this.isLastStep.asObservable();
  }

  getWordWithSensesAddWordSensesForm() {
    return this.wordWithSensesAddWordSensesForm.asObservable();
  }

  getPageNumberAddWordSensesForm() {
    return this.pageNumberAddWordSensesForm.asObservable();
  }

  getHasMoreWordsAddWordSensesForm() {
    return this.hasMoreWordsAddWordSensesForm.asObservable();
  }

  setWordSenseIds(wordSenseIds: number[]) {
    this.wordSenseIds.next(wordSenseIds);
  }

  setAddDeckState(addDeckState: AddDeckState) {
    this.addDeckState.next(addDeckState);
    this.setIsFirstStep();
    this.setIsLastStep();
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

  setPreviousState() {
    const addOrEdit = this.addOrEdit.value;
    const deckState = DECK_STATE_ORDER[addOrEdit];
    const currentAddDeckStateIndex =
      this.getCurrentAddDeckStateIndexByState(addOrEdit);

    let nextState;
    if (currentAddDeckStateIndex === 0) {
      nextState = this.addDeckState;
    } else {
      nextState = deckState[currentAddDeckStateIndex - 1];
      this.setAddDeckStateIndex(currentAddDeckStateIndex - 1);
    }

    this.setAddDeckState(nextState);
  }

  setIsFirstStep() {
    const addOrEdit = this.addOrEdit.value;
    const deckState = DECK_STATE_ORDER[addOrEdit];
    if (deckState[0] === this.addDeckState.value) {
      this.isFirstStep.next(true);
      return;
    }
    this.isFirstStep.next(false);
  }

  setIsLastStep() {
    const addOrEdit = this.addOrEdit.value;
    const deckState = DECK_STATE_ORDER[addOrEdit];
    const deckStateLength = deckState.length;
    if (deckState[deckStateLength - 1] === this.addDeckState.value) {
      this.isLastStep.next(true);
      return;
    }
    this.isLastStep.next(false);
  }

  setWordWithSenseAddWordSensesForm(wordWithSenses: WordWithSense[]) {
    this.wordWithSensesAddWordSensesForm.next(wordWithSenses);
  }

  setPageNumberAddWordSensesForm(pageNumber: number) {
    this.pageNumberAddWordSensesForm.next(pageNumber);
  }

  setHasMoreWordsAddWordSensesForm(hasMoreWords: boolean) {
    this.hasMoreWordsAddWordSensesForm.next(hasMoreWords);
  }

  private getCurrentAddDeckStateIndexByState(addOrEdit: AddOrEdit) {
    return DECK_STATE_ORDER[addOrEdit].indexOf(this.addDeckState.value);
  }
}
