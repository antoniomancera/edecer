import { Component, OnInit, signal } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import {
  WordFilterRequest,
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
import { ModalController } from '@ionic/angular';
import { FilterWordSenseComponent } from './filter-word-sense/filter-word-sense.component';
import { combineLatest, map } from 'rxjs';
import { Deck } from 'src/app/shared/models/deck.interface';
import { DeckWordPhraseTranslationService } from 'src/app/shared/services/deck-word-phrase-translation.service';

import { DeckEditInitInfoHelperService } from '../../services/deck-edit-init-info-helper.service';
import { DeckEditInitInfo } from '../../models/deck-edit-init-info.model';

@Component({
  selector: 'app-add-word-sense',
  templateUrl: './add-word-sense.component.html',
  styleUrls: ['./add-word-sense.component.scss'],
})
export class AddWordSenseComponent implements OnInit {
  addWordSensesForm!: FormGroup;
  globalIndex = 0;
  pageNumber = 0;
  pageSize = 50;
  hasMoreWords = signal<boolean>(true);
  wordFilterRequest: WordFilterRequest;
  addEditOrInfo = AddEditOrInfo;
  addEditOrInfoSelected: AddEditOrInfo;
  wordWithAttemptsAndSuccesses: WordWithAttemptsAndSuccess[] = [];
  deckEditInitInfo: DeckEditInitInfo;
  selectedWordSenseEditInitIds: number[] = [];
  selectedDeck = signal<Deck>(null);

  constructor(
    private toastService: ToastService,
    private wordService: WordService,
    private fb: FormBuilder,
    private deckStateService: DeckStateService,
    private modalController: ModalController,
    private deckWordPhraseTranslationService: DeckWordPhraseTranslationService,
    private deckEditInitInfoHelperService: DeckEditInitInfoHelperService,
  ) {
    this.addWordSensesForm = this.fb.group({
      selectedSenses: new FormArray([], minSelectedCheckboxes()),
    });
  }

  get selectedSensesFormArray() {
    return this.addWordSensesForm.get('selectedSenses') as FormArray;
  }

  ngOnInit() {
    this.deckStateService.setIsLoading(true);
    this.deckStateService.setIsAddWordSenseInitialized(true);

    combineLatest([
      this.deckStateService.getAddEditOrInfo(),
      this.deckStateService.getWordFilterRequest(),
      this.deckStateService.getSelectedDeck(),
    ])
      .pipe(
        map(([addEditOrInfoSelected, wordFilterRequest, selectedDeck]) => {
          this.addEditOrInfoSelected = addEditOrInfoSelected;
          this.wordFilterRequest = wordFilterRequest;
          this.selectedDeck.set(selectedDeck);
        }),
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

                  if (this.addEditOrInfoSelected === this.addEditOrInfo.EDIT) {
                    this.deckEditInitInfo = deckEditInit;

                    this.selectedWordSenseEditInitIds =
                      this.deckEditInitInfoHelperService.getAllWordSenseIds(
                        deckEditInit,
                      );
                    this.wordWithAttemptsAndSuccesses.map(
                      (wordWithAttemptsAndSuccess) => {
                        if (
                          this.deckEditInitInfoHelperService.hasWord(
                            this.deckEditInitInfo,
                            wordWithAttemptsAndSuccess.word.id,
                          )
                        ) {
                          wordWithAttemptsAndSuccess.word.isChecked = true;
                        }
                      },
                    );
                  }
                },
              });
          } else {
            this.getWordWithAttemptsAndSuccessPaginated();
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

    this.addWordSensesForm.statusChanges.subscribe((validity) => {
      validity === 'VALID' || this.selectedWordSenseEditInitIds.length > 0
        ? this.deckStateService.setIsAddWordSenseFormValid(true)
        : this.deckStateService.setIsAddWordSenseFormValid(false);
    });
  }

  onSubmitSelectPhrases() {
    let wordSenseIds: number[] = [];

    wordSenseIds = this.selectedWordSenseEditInitIds;

    this.wordWithAttemptsAndSuccesses.forEach((wordWithAttemptsAndSuccess) => {
      if (wordWithAttemptsAndSuccess.wordSenseInfoWithoutWord) {
        wordWithAttemptsAndSuccess.wordSenseInfoWithoutWord.forEach(
          (wordSenseInfo) => {
            const control = this.selectedSensesFormArray.at(
              wordSenseInfo.wordSense.globalIndex,
            );
            if (control?.value === true && wordSenseInfo.wordSense.id != null) {
              wordSenseIds.push(wordSenseInfo.wordSense.id);
            }
          },
        );
      }
    });

    wordSenseIds = [...new Set(wordSenseIds)];

    this.deckStateService.setWordSenseIds(wordSenseIds);
    this.deckStateService.setNextState();

    return wordSenseIds;
  }

  onChangeWord(event, wordWithAttemptsAndSuccess: WordWithAttemptsAndSuccess) {
    console.log('onChangeWord', event);
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

      if (
        this.addEditOrInfoSelected === this.addEditOrInfo.EDIT &&
        !isChecked
      ) {
        this.deckEditInitInfo =
          this.deckEditInitInfoHelperService.removeWordFromMap(
            this.deckEditInitInfo,
            wordWithAttemptsAndSuccess.word.id,
          );
      }
    }
  }

  onChangeWordSense(
    wordWithSense: WordWithAttemptsAndSuccess,
    wordSense: WordSenseInfoWithoutWord,
  ) {
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
  }

  async onClickOpenFilterModal() {
    const modal = await this.modalController.create({
      component: FilterWordSenseComponent,

      initialBreakpoint: 0.9,
    });
    await modal.present();
  }

  onClickGetWordSensesByWord(
    wordWithAttemptsAndSuccess: WordWithAttemptsAndSuccess,
    isChangeWord?: boolean,
  ) {
    const isChecked = wordWithAttemptsAndSuccess.word.isChecked;
    if (
      !wordWithAttemptsAndSuccess.wordSenseInfoWithoutWord ||
      wordWithAttemptsAndSuccess.wordSenseInfoWithoutWord.length === 0
    ) {
      wordWithAttemptsAndSuccess.word.isLoading = true;

      this.wordService
        .getWordSenseInfosWithoutWordByWordId(
          wordWithAttemptsAndSuccess.word.id,
        )
        .subscribe({
          next: (wordSenseInfoWithoutWord) => {
            console.log('prueba2');
            wordSenseInfoWithoutWord.map((worSenseInfo) => {
              worSenseInfo.wordSense.globalIndex = this.globalIndex;
              this.globalIndex++;

              if (isChangeWord) {
                if (isChecked) {
                  this.selectedSensesFormArray.push(new FormControl(true));
                } else if (
                  !isChecked &&
                  this.addEditOrInfoSelected === this.addEditOrInfo.EDIT
                ) {
                  this.selectedSensesFormArray.push(new FormControl(false));
                  this.deckEditInitInfo =
                    this.deckEditInitInfoHelperService.removeWordFromMap(
                      this.deckEditInitInfo,
                      wordWithAttemptsAndSuccess.word.id,
                    );
                }
              } else {
                if (
                  isChecked &&
                  this.addEditOrInfoSelected === this.addEditOrInfo.EDIT
                ) {
                  if (
                    this.selectedWordSenseEditInitIds.includes(
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

  private getWordWithAttemptsAndSuccessPaginated(infiniteScroll?) {
    this.wordService
      .getWordWithAttemptsAndSuccessPaginated(this.pageNumber, this.pageSize)
      .subscribe({
        next: (wordWithAttemptsAndSuccesses) => {
          wordWithAttemptsAndSuccesses.map((wordWithAttemptsAndSuccess) => {
            if (
              this.addEditOrInfoSelected === this.addEditOrInfo.EDIT &&
              this.deckEditInitInfoHelperService.hasWord(
                this.deckEditInitInfo,
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
            // this.hasMoreWordsUnselected.set(false);
            this.hasMoreWords.set(false);
          } else {
            this.pageNumber += 1;
          }
          if (infiniteScroll) {
            infiniteScroll.target.complete();
          }
        },
      });
  }
}
