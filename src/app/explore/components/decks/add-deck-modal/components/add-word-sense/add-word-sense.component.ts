import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { ModalController } from '@ionic/angular';

import { combineLatest, map, Observable, take } from 'rxjs';

import {
  WordSenseInfoWithoutWord,
  WordWithAttemptsAndSuccess,
} from 'src/app/shared/models/word.interface';
import { ToastService } from 'src/app/shared/services/toast.service';
import { WordService } from 'src/app/shared/services/word.service';
import { minSelectedCheckboxes } from 'src/app/shared/validators/custom-validators';
import {
  AddEditOrInfo,
  DeckStateService,
} from '../../services/deck-state.service';
import { FilterWordSenseComponent } from './filter-word-sense/filter-word-sense.component';
import { Deck } from 'src/app/shared/models/deck.interface';
import { DeckWordPhraseTranslationService } from 'src/app/shared/services/deck-word-phrase-translation.service';
import { WordToWordSensesIdMap } from '../../models/deck-edit-init-info.model';
import { WordToWordSensesIdMapService } from '../../services/word-to-word-senses-id-map.service';
import { WordFilterRequest } from 'src/app/shared/models/word-filter.model';

@Component({
  selector: 'app-add-word-sense',
  templateUrl: './add-word-sense.component.html',
  styleUrls: ['./add-word-sense.component.scss'],
})
export class AddWordSenseComponent implements OnInit, OnDestroy {
  addWordSensesForm!: FormGroup;
  globalIndex = 0;
  pageNumber = 1;
  pageSize = 10;
  hasMoreWords = signal<boolean>(true);
  addEditOrInfo = AddEditOrInfo;
  addEditOrInfoSelected: AddEditOrInfo;
  wordWithAttemptsAndSuccesses: WordWithAttemptsAndSuccess[] = [];
  wordToWordSensesIdMap: WordToWordSensesIdMap = {
    wordToWordSensesIdMap: null,
  };
  selectedWordSenseEditInitIds: number[] = [];
  selectedDeck = signal<Deck>(null);
  selectedWordFilterRequest = signal<WordFilterRequest>(null);
  wordFilterRequestAvailables = signal<WordFilterRequest[]>([]);
  isLoading = signal<boolean>(false);

  constructor(
    private toastService: ToastService,
    private wordService: WordService,
    private fb: FormBuilder,
    private deckStateService: DeckStateService,
    private modalController: ModalController,
    private deckWordPhraseTranslationService: DeckWordPhraseTranslationService,
    private wordToWordSensesIdMapService: WordToWordSensesIdMapService,
  ) {
    this.addWordSensesForm = this.fb.group({
      selectedSenses: new FormArray([], minSelectedCheckboxes()),
    });
  }

  get selectedSensesFormArray() {
    return this.addWordSensesForm.get('selectedSenses') as FormArray;
  }

  getControlAt(index: number): FormControl {
    return this.selectedSensesFormArray.at(index) as FormControl;
  }

  ngOnInit() {
    this.deckStateService.setIsLoading(true);
    this.deckStateService.setIsAddWordSenseInitialized(true);

    combineLatest([
      this.deckStateService.getAddEditOrInfo(),
      this.deckStateService.getSelectedDeck(),
      this.deckStateService.getWordFilterRequestAvailables(),
    ])
      .pipe(
        take(1),
        map(
          ([
            addEditOrInfoSelected,
            selectedDeck,
            wordFilterRequestAvailables,
          ]) => {
            this.addEditOrInfoSelected = addEditOrInfoSelected;
            this.selectedDeck.set(selectedDeck);
            this.wordFilterRequestAvailables.set(wordFilterRequestAvailables);
          },
        ),
      )
      .subscribe({
        next: () => {
          if (this.addEditOrInfoSelected === this.addEditOrInfo.EDIT) {
            this.deckWordPhraseTranslationService
              .getDeckEditInit(this.selectedDeck().id, this.pageSize)
              .subscribe({
                next: (deckEditInit) => {
                  this.wordWithAttemptsAndSuccesses =
                    deckEditInit.wordWithAttemptsAndSuccesses;

                  this.wordToWordSensesIdMap.wordToWordSensesIdMap =
                    deckEditInit.wordToWordSensesIdMap;

                  this.selectedWordSenseEditInitIds =
                    this.wordToWordSensesIdMapService.getAllWordSenseIds(
                      deckEditInit,
                    );
                  this.wordWithAttemptsAndSuccesses.map(
                    (wordWithAttemptsAndSuccess) => {
                      if (
                        this.wordToWordSensesIdMapService.hasWord(
                          this.wordToWordSensesIdMap,
                          wordWithAttemptsAndSuccess.word.id,
                        )
                      ) {
                        wordWithAttemptsAndSuccess.word.isChecked = true;
                      }
                    },
                  );
                  this.subscribeFormValidation();
                },
              });
          } else {
            this.getWordWithAttemptsAndSuccessPaginated();
            this.subscribeFormValidation();
          }

          const formArray = new FormArray([], minSelectedCheckboxes());
          this.addWordSensesForm.setControl('selectedSenses', formArray);
          this.deckStateService.setIsLoading(false);
        },
        error: (err) => {
          this.deckStateService.setIsLoading(true);
          this.toastService.showDangerToast(err);
        },
      });
  }

  ngOnDestroy() {
    this.resetSelectedSensesFormArray();
  }

  /**
   * On submit go to step selectPhrases with the actual wordSenses selected
   */
  onSubmitSelectPhrases() {
    this.setWordToWordSensesIdMapByWordWithAttemptsAndSuccesses();

    let wordSenseIds: number[] =
      this.wordToWordSensesIdMapService.getAllWordSenseIds(
        this.wordToWordSensesIdMap,
      );

    wordSenseIds = [...new Set(wordSenseIds)];

    this.deckStateService.setWordSenseIds(wordSenseIds);
    this.deckStateService.setNextState();
  }

  /**
   * On Click toggle isChecked parameter of word, alongside their senses. In case word pass to not checked
   * and the mode is edit, all the senses are removed from selectedWordSenseEditInitIds.
   *
   * @param event
   * @param wordWithAttemptsAndSuccess
   */
  onClickToggleWord(
    event,
    wordWithAttemptsAndSuccess: WordWithAttemptsAndSuccess,
  ) {
    event.stopPropagation();
    const isChecked = event.detail.checked;
    wordWithAttemptsAndSuccess.word.isChecked = isChecked;

    if (!wordWithAttemptsAndSuccess.wordSenseInfoWithoutWord) {
      this.onClickGetWordSensesByWord(wordWithAttemptsAndSuccess, true);
    } else if (wordWithAttemptsAndSuccess.wordSenseInfoWithoutWord) {
      const globalIndexOfWordSense =
        wordWithAttemptsAndSuccess.wordSenseInfoWithoutWord.map(
          (wordSense) => wordSense.wordSense.globalIndex,
        );

      globalIndexOfWordSense.forEach((globalIndex) => {
        const control = this.selectedSensesFormArray.at(globalIndex);
        control.setValue(isChecked);
      });

      if (this.selectedWordSenseEditInitIds.length > 0 && !isChecked) {
        this.wordToWordSensesIdMap =
          this.wordToWordSensesIdMapService.removeWord(
            this.wordToWordSensesIdMap,
            wordWithAttemptsAndSuccess.word.id,
          );
      }
    }
  }

  /**
   * On click toggle isChecked of wordSense, if is false and there are not other wordSense selected
   * for the word the isChecked parameter of the word change to false, on the contrary isChecked of
   * word is true. If is EDIT mode and the sense is unselected the wordSense if remove to the initially
   * selected wordSenses
   *
   * @param event
   * @param wordWithSense
   * @param wordSense
   */
  onClickToggleWordSense(
    event,
    wordWithSense: WordWithAttemptsAndSuccess,
    wordSense: WordSenseInfoWithoutWord,
  ) {
    const isChecked = event.detail.checked;

    if (
      this.selectedSensesFormArray.at(wordSense.wordSense.globalIndex).value
    ) {
      wordWithSense.word.isChecked = true;
    } else {
      const globalIndexOfWordSense = wordWithSense.wordSenseInfoWithoutWord.map(
        (wordSense) => wordSense.wordSense.globalIndex,
      );

      const hasSelectedWordSense = globalIndexOfWordSense.some(
        (globalIndex) => {
          const control = this.selectedSensesFormArray.at(globalIndex);
          return control?.value && wordSense.wordSense.id != null;
        },
      );

      wordWithSense.word.isChecked = hasSelectedWordSense;
    }
    if (this.selectedWordSenseEditInitIds.length > 0 && !isChecked) {
      this.wordToWordSensesIdMap =
        this.wordToWordSensesIdMapService.removeWordSenseToWord(
          this.wordToWordSensesIdMap,
          wordWithSense.word.id,
          wordSense.wordSense.id,
        );
    }
  }

  async onClickOpenFilterModal() {
    const modal = await this.modalController.create({
      component: FilterWordSenseComponent,

      initialBreakpoint: 0.9,
    });
    modal.onWillDismiss().then((wordFilterRequestSelected) => {
      if (wordFilterRequestSelected && wordFilterRequestSelected.data) {
        this.wordFilterRequestAvailables().push(wordFilterRequestSelected.data);
        this.getWordWithSensePaginatedAplyingWordSenseFilter(
          wordFilterRequestSelected.data,
        );
      }
    });

    await modal.present();
  }

  /**
   * Search senses of word taking into account if exists any filter. If isToggleWord means that this method is
   * called after clicking on a word checkbox, therefore the controls of the senses will be created initially as
   * false or true depending on if word is checked or not. However, isToggleWord woill be false if this method
   * is called after clicking on a accordion, therefore the controls will be false if is ADD mode, whereas if is EDIT
   * it would depend on if the sense was currently in the deck
   *
   * @param wordWithAttemptsAndSuccess
   * @param isToggleWord true if the method is called after clicking a word.
   */
  onClickGetWordSensesByWord(
    wordWithAttemptsAndSuccess: WordWithAttemptsAndSuccess,
    isToggleWord?: boolean,
  ) {
    const isChecked = wordWithAttemptsAndSuccess.word.isChecked;
    if (
      !wordWithAttemptsAndSuccess.wordSenseInfoWithoutWord ||
      wordWithAttemptsAndSuccess.wordSenseInfoWithoutWord.length === 0
    ) {
      wordWithAttemptsAndSuccess.word.isLoading = true;

      this.wordService
        .getWordSenseInfosWithoutWordByWordIdAplyingWordSenseFiltersIfExists(
          wordWithAttemptsAndSuccess.word.id,
          this.selectedWordFilterRequest(),
        )
        .subscribe({
          next: (wordSenseInfoWithoutWord) => {
            wordSenseInfoWithoutWord.map((worSenseInfo) => {
              worSenseInfo.wordSense.globalIndex = this.globalIndex;
              this.globalIndex++;

              if (isToggleWord) {
                if (isChecked) {
                  this.selectedSensesFormArray.push(new FormControl(true));
                } else if (
                  !isChecked &&
                  this.selectedWordSenseEditInitIds.length > 0
                ) {
                  this.selectedSensesFormArray.push(new FormControl(false));
                  this.wordToWordSensesIdMap =
                    this.wordToWordSensesIdMapService.removeWord(
                      this.wordToWordSensesIdMap,
                      wordWithAttemptsAndSuccess.word.id,
                    );
                }
              } else {
                if (isChecked && this.selectedWordSenseEditInitIds.length > 0) {
                  if (
                    this.wordToWordSensesIdMapService.hasSpecificWordSenseInWord(
                      this.wordToWordSensesIdMap,
                      wordWithAttemptsAndSuccess.word.id,
                      worSenseInfo.wordSense.id,
                    )
                  ) {
                    this.selectedSensesFormArray.push(new FormControl(true));
                  } else {
                    this.selectedSensesFormArray.push(new FormControl(false));
                  }
                } else {
                  this.selectedSensesFormArray.push(new FormControl(false));
                }
              }
            });

            wordWithAttemptsAndSuccess.wordSenseInfoWithoutWord =
              wordSenseInfoWithoutWord;
            wordWithAttemptsAndSuccess.word.isLoading = false;
          },
        });
    }
  }

  /**
   * Apply the filter after reseting the form
   *
   * @param wordFilterRequest apply for getWordWithAttemptAndSuccesses
   */

  getWordWithSensePaginatedAplyingWordSenseFilter(wordFilterRequest) {
    this.resetSelectedSensesFormArray();

    this.wordFilterRequestAvailables().map(
      (wordFilterRequest) => (wordFilterRequest.isChecked = false),
    );
    wordFilterRequest.isChecked = true;
    this.selectedWordFilterRequest.set(wordFilterRequest);
    this.getWordWithAttemptsAndSuccessPaginated();
  }

  /**
   * Get the next page of Words with number of attempts and accuracy
   *
   * @param infiniteScroll
   */
  getWordWithAttemptsAndSuccessPaginated(infiniteScroll?) {
    this.isLoading.set(true);
    this.wordService
      .getWordWithAttemptsAndSuccessesPaginatedAplyingWordFilterIfExists(
        this.pageNumber,
        this.pageSize,
        this.selectedWordFilterRequest(),
      )
      .subscribe({
        next: (wordWithAttemptsAndSuccesses) => {
          wordWithAttemptsAndSuccesses.map((wordWithAttemptsAndSuccess) => {
            if (
              this.selectedWordSenseEditInitIds.length > 0 &&
              this.wordToWordSensesIdMapService.hasWord(
                this.wordToWordSensesIdMap,
                wordWithAttemptsAndSuccess.word.id,
              )
            ) {
              wordWithAttemptsAndSuccess.word.isChecked = true;
            }
          });
          this.wordWithAttemptsAndSuccesses = [
            ...this.wordWithAttemptsAndSuccesses,
            ...wordWithAttemptsAndSuccesses,
          ];
          if (wordWithAttemptsAndSuccesses.length < this.pageSize) {
            this.hasMoreWords.set(false);
          } else {
            this.pageNumber += 1;
          }
          if (infiniteScroll) {
            infiniteScroll.target.complete();
          }

          this.isLoading.set(false);
        },
      });
  }

  /**
   * Reset the form and the other values
   */
  private resetSelectedSensesFormArray() {
    this.setWordToWordSensesIdMapByWordWithAttemptsAndSuccesses();

    while (this.selectedSensesFormArray.length > 0) {
      this.selectedSensesFormArray.removeAt(0);
    }
    this.globalIndex = 0;
    this.wordWithAttemptsAndSuccesses = [];
    this.hasMoreWords.set(true);
    this.pageNumber = 0;

    this.addWordSensesForm.markAsPristine();
    this.addWordSensesForm.markAsUntouched();
    this.addWordSensesForm.updateValueAndValidity();
  }

  /**
   * Add to wordToWordSensesIdMap the map with selected word and wordSenses of the deck
   */
  private setWordToWordSensesIdMapByWordWithAttemptsAndSuccesses() {
    this.wordWithAttemptsAndSuccesses.forEach((wordWithAttemptsAndSuccess) => {
      if (wordWithAttemptsAndSuccess.wordSenseInfoWithoutWord) {
        wordWithAttemptsAndSuccess.wordSenseInfoWithoutWord.forEach(
          (wordSenseInfo) => {
            const control = this.selectedSensesFormArray.at(
              wordSenseInfo.wordSense.globalIndex,
            );
            if (control?.value === true && wordSenseInfo.wordSense.id != null) {
              this.wordToWordSensesIdMap =
                this.wordToWordSensesIdMapService.addWordToWordSense(
                  this.wordToWordSensesIdMap,
                  wordWithAttemptsAndSuccess.word.id,
                  wordSenseInfo.wordSense.id,
                );
            }
          },
        );
      }
    });
  }

  private subscribeFormValidation() {
    if (this.wordToWordSensesIdMap.wordToWordSensesIdMap) {
      this.deckStateService.setIsAddWordSenseFormValid(true);
    }

    this.addWordSensesForm.statusChanges.subscribe((validity) => {
      validity === 'VALID' || this.wordToWordSensesIdMap.wordToWordSensesIdMap
        ? this.deckStateService.setIsAddWordSenseFormValid(true)
        : this.deckStateService.setIsAddWordSenseFormValid(false);
    });
  }
}
