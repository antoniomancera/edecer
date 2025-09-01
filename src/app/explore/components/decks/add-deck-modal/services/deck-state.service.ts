import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Deck } from 'src/app/shared/models/deck.interface';
import {
  compareWordFilterRequest,
  WordFilterRequest,
} from 'src/app/shared/models/word-filter.model';

export enum AddDeckState {
  WORD_SENSE = 'WORD_SENSE',
  PHRASE = 'PHRASE',
  TITLE = 'TITLE',
}

export enum AddEditOrInfo {
  ADD = 'ADD',
  EDIT = 'EDIT',
}

export const DECK_STATE_ORDER = {
  [AddEditOrInfo.ADD]: [
    AddDeckState.WORD_SENSE,
    AddDeckState.PHRASE,
    AddDeckState.TITLE,
  ],
  [AddEditOrInfo.EDIT]: [
    AddDeckState.WORD_SENSE,
    AddDeckState.PHRASE,
    AddDeckState.TITLE,
  ],
} as const;

@Injectable({
  providedIn: 'root',
})
export class DeckStateService {
  private isLoading = new BehaviorSubject<boolean>(false);
  private wordSenseIds = new BehaviorSubject<number[]>(null);
  private wordPhraseTranslationIds = new BehaviorSubject<number[]>(null);
  private addDeckState = new BehaviorSubject<AddDeckState>(
    AddDeckState.WORD_SENSE,
  );
  private addEditOrInfo = new BehaviorSubject<AddEditOrInfo>(AddEditOrInfo.ADD);
  private addDeckStateIndex = new BehaviorSubject<number>(null);
  private isFirstStep = new BehaviorSubject<boolean>(true);
  private isLastStep = new BehaviorSubject<boolean>(false);
  private isAddWordSenseInitialized = new BehaviorSubject<boolean>(false);
  private isAddPhraseInitialized = new BehaviorSubject<boolean>(false);
  private isAddTitleItialized = new BehaviorSubject<boolean>(false);
  private isAddWordSenseFormValid = new BehaviorSubject<boolean>(false);
  private isAddPhraseFormValid = new BehaviorSubject<boolean>(false);
  private isAddTitleDescriptionFormValid = new BehaviorSubject<boolean>(false);
  private isActualFormValid = new BehaviorSubject<boolean>(false);
  private selectedDeck = new BehaviorSubject<Deck>(null);
  private wordFilterRequest = new BehaviorSubject<WordFilterRequest>(
    this.getWordFilterRequestAll(),
  );
  private wordFilterRequestAvailables = new BehaviorSubject<
    WordFilterRequest[]
  >(this.getWordFilterRequestAvailablesInit());

  getIsLoading() {
    return this.isLoading.asObservable();
  }

  getWordSenseIds() {
    return this.wordSenseIds.asObservable();
  }

  getAddDeckState() {
    return this.addDeckState.asObservable();
  }

  getWordPhraseTranslationIds() {
    return this.wordPhraseTranslationIds.asObservable();
  }

  getAddEditOrInfo() {
    return this.addEditOrInfo.asObservable();
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

  getIsAddWordSenseInitialized() {
    return this.isAddWordSenseInitialized.asObservable();
  }

  getIsAddPhraseInitialized() {
    return this.isAddPhraseInitialized.asObservable();
  }

  getIsAddTitleItialized() {
    return this.isAddTitleItialized.asObservable();
  }

  getIsAddWordSenseFormValid() {
    return this.isAddWordSenseFormValid.asObservable();
  }

  getIsAddPhraseFormValid() {
    return this.isAddPhraseFormValid.asObservable();
  }

  getIsAddTitleDescriptionFormValid() {
    return this.isAddTitleDescriptionFormValid.asObservable();
  }

  getIsActualFormValid() {
    return this.isActualFormValid.asObservable();
  }

  getWordFilterRequest() {
    return this.wordFilterRequest.asObservable();
  }

  getSelectedDeck() {
    return this.selectedDeck.asObservable();
  }

  getWordFilterRequestAvailables() {
    return this.wordFilterRequestAvailables.asObservable();
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading.next(isLoading);
  }

  setWordSenseIds(wordSenseIds: number[]) {
    this.wordSenseIds.next(wordSenseIds);
  }

  setAddDeckState(addDeckState: AddDeckState) {
    this.addDeckState.next(addDeckState);
    this.setIsFirstStep();
    this.setIsLastStep();
    this.setIsActualFormValid();
  }

  setWordPhraseTranslationIds(phraseTranslationIds: number[]) {
    this.wordPhraseTranslationIds.next(phraseTranslationIds);
  }

  setAddEditOrInfo(addEditOrInfo: AddEditOrInfo) {
    this.addEditOrInfo.next(addEditOrInfo);
  }

  setAddDeckStateIndex(addDeckStateIndex: number) {
    this.addDeckStateIndex.next(addDeckStateIndex);
  }

  setNextState() {
    const addEditOrInfo = this.addEditOrInfo.value;
    const deckState = DECK_STATE_ORDER[addEditOrInfo];
    const deckStateLength = deckState.length;
    const currentAddDeckStateIndex =
      this.getCurrentAddDeckStateIndexByState(addEditOrInfo);

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
    const addEditOrInfo = this.addEditOrInfo.value;
    const deckState = DECK_STATE_ORDER[addEditOrInfo];
    const currentAddDeckStateIndex =
      this.getCurrentAddDeckStateIndexByState(addEditOrInfo);

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
    const addEditOrInfo = this.addEditOrInfo.value;
    const deckState = DECK_STATE_ORDER[addEditOrInfo];
    if (deckState[0] === this.addDeckState.value) {
      this.isFirstStep.next(true);
      return;
    }
    this.isFirstStep.next(false);
  }

  setIsLastStep() {
    const addEditOrInfo = this.addEditOrInfo.value;
    const deckState = DECK_STATE_ORDER[addEditOrInfo];
    const deckStateLength = deckState.length;
    if (deckState[deckStateLength - 1] === this.addDeckState.value) {
      this.isLastStep.next(true);
      return;
    }
    this.isLastStep.next(false);
  }

  setIsAddWordSenseInitialized(isAddWordSenseInitialized: boolean) {
    this.isAddWordSenseInitialized.next(isAddWordSenseInitialized);
  }

  setIsAddPhraseInitialized(isAddPhraseInitialized: boolean) {
    this.isAddPhraseInitialized.next(isAddPhraseInitialized);
  }

  setIsAddTitleItialized(isAddTitleItialized: boolean) {
    this.isAddTitleItialized.next(isAddTitleItialized);
  }

  setIsAddWordSenseFormValid(isAddWordSenseFormValid: boolean) {
    this.isAddWordSenseFormValid.next(isAddWordSenseFormValid);
    this.setIsActualFormValid();
  }

  setIsAddPhraseFormValid(isAddPhraseFormValid: boolean) {
    this.isAddPhraseFormValid.next(isAddPhraseFormValid);
    this.setIsActualFormValid();
  }

  setIsAddTitleDescriptionFormValid(isAddTitleDescriptionFormValid: boolean) {
    this.isAddTitleDescriptionFormValid.next(isAddTitleDescriptionFormValid);
    this.setIsActualFormValid();
  }

  setIsActualFormValid() {
    let isActualFormValid = false;
    switch (this.addDeckState.value) {
      case AddDeckState.WORD_SENSE:
        isActualFormValid = this.isAddWordSenseFormValid.value;
        break;
      case AddDeckState.PHRASE:
        isActualFormValid = this.isAddPhraseFormValid.value;
        break;
      case AddDeckState.TITLE:
        isActualFormValid = this.isAddTitleDescriptionFormValid.value;
        break;
    }
    this.isActualFormValid.next(isActualFormValid);
  }

  setWordFilterRequest(wordFilterRequest: WordFilterRequest) {
    if (
      !compareWordFilterRequest(wordFilterRequest, this.wordFilterRequest.value)
    ) {
      this.wordFilterRequest.next(wordFilterRequest);
    }
  }

  setSelectedDeck(deck: Deck) {
    return this.selectedDeck.next(deck);
  }

  setwordFilterRequestAvailables(
    wordFilterRequestAvailables: WordFilterRequest[],
  ) {
    return this.wordFilterRequestAvailables.next(wordFilterRequestAvailables);
  }

  addwordFilterRequestAvailables(wordFilterRequest: WordFilterRequest) {
    return this.wordFilterRequestAvailables.next([
      ...this.wordFilterRequestAvailables.value,
      wordFilterRequest,
    ]);
  }

  private getCurrentAddDeckStateIndexByState(addEditOrInfo: AddEditOrInfo) {
    return DECK_STATE_ORDER[addEditOrInfo].indexOf(this.addDeckState.value);
  }

  private getWordFilterRequestAvailablesInit(): WordFilterRequest[] {
    const wordFilterRequestA1: WordFilterRequest = {
      name: 'A1',
      levels: [{ code: 'A1' }],
    };
    const wordFilterRequestMin20Max90 = {
      name: '20-90%',
      minAccuracy: 20,
      maxAccuracy: 90,
    };

    return [
      this.getWordFilterRequestAll(),
      wordFilterRequestA1,
      wordFilterRequestMin20Max90,
    ];
  }

  private getWordFilterRequestAll(): WordFilterRequest {
    return {
      name: 'All',
      isChecked: true,
      textFiltered: [],
      minAccuracy: null,
      maxAccuracy: null,
      partSpeeches: [],
      levels: [],
      categories: [],
      persons: [],
      genders: [],
      numbers: [],
      moodWithTenses: [],
      tenses: [],
    };
  }
}
