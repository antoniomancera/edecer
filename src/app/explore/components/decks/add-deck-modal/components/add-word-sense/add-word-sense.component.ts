import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { WordSense, WordWithSense } from 'src/app/shared/models/word.interface';
import { ToastService } from 'src/app/shared/services/toast.service';
import { WordService } from 'src/app/shared/services/word.service';
import { minSelectedCheckboxes } from 'src/app/shared/validators/custom-validators';
import { DeckStateService } from '../../services/deck-state.service';

@Component({
  selector: 'app-add-word-sense',
  templateUrl: './add-word-sense.component.html',
  styleUrls: ['./add-word-sense.component.scss'],
})
export class AddWordSenseComponent implements OnInit {
  addWordSensesForm!: FormGroup;
  globalIndex = 0;
  pageNumber = 0;
  pageSize = 10;
  hasMoreWords = true;
  wordWithSenses: WordWithSense[] = [];
  wordSenseIds: number[] = [];

  constructor(
    private toastService: ToastService,
    private wordService: WordService,
    private fb: FormBuilder,
    private deckStateService: DeckStateService,
    private cdRef: ChangeDetectorRef
  ) {
    this.addWordSensesForm = this.fb.group({
      selectedSenses: new FormArray([], minSelectedCheckboxes()),
    });
  }

  ngOnInit() {
    this.deckStateService.setIsLoading(true);
    this.deckStateService.setIsAddWordSenseInitialized(true);

    this.createSelectedSensesFormArray(this.pageNumber, this.pageSize);
    this.addWordSensesForm.statusChanges.subscribe((validity) => {
      validity === 'VALID'
        ? this.deckStateService.setIsAddWordSenseFormValid(true)
        : this.deckStateService.setIsAddWordSenseFormValid(false);
    });
  }

  get selectedSensesFormArray() {
    return this.addWordSensesForm.get('selectedSenses') as FormArray;
  }

  onSubmitSelectPhrases() {
    let wordSenseIds: number[] = [];

    let globalIndex = 0;
    this.wordWithSenses.forEach((wordWithSense) => {
      wordWithSense.wordSenses.forEach((wordSense) => {
        const control = this.selectedSensesFormArray.at(globalIndex);
        if (control?.value && wordSense.id != null) {
          wordSenseIds.push(wordSense.id);
        }
        globalIndex++;
      });
    });
    this.deckStateService.setWordSenseIds(wordSenseIds);
    this.deckStateService.setNextState();

    return wordSenseIds;
  }

  onChangeWord(event, wordWithSense: WordWithSense) {
    const isChecked = event.detail.checked;
    const globalIndexOfWordSense = wordWithSense.wordSenses.map(
      (wordSense) => wordSense.globalIndex
    );

    globalIndexOfWordSense.forEach((globalIndex) => {
      const control = this.selectedSensesFormArray.at(globalIndex);
      control.setValue(isChecked);
    });
  }

  onChangeWordSense(wordWithSense: WordWithSense, wordSense: WordSense) {
    if (this.selectedSensesFormArray.at(wordSense.globalIndex).value) {
      wordWithSense.word.isChecked = true;
    } else {
      const globalIndexOfWordSense = wordWithSense.wordSenses.map(
        (wordSense) => wordSense.globalIndex
      );

      const hasSelectedWordSense = globalIndexOfWordSense.some(
        (globalIndex) => {
          const control = this.selectedSensesFormArray.at(globalIndex);
          return control?.value && wordSense.id != null;
        }
      );

      wordWithSense.word.isChecked = hasSelectedWordSense;
    }
  }

  onIonInfiniteGetNextPageWordSenses(infiniteScroll) {
    this.pageNumber += 1;
    this.addNextPageWordSenses(this.pageNumber, this.pageSize, infiniteScroll);
  }

  private createSelectedSensesFormArray(pageNumber: number, pageSize: number) {
    this.wordService.getWordWithSensePaginated(pageNumber, pageSize).subscribe({
      next: (wordWithSenses) => {
        this.wordWithSenses = wordWithSenses;

        const controls = [];
        this.wordWithSenses.forEach((wordWithSense) => {
          wordWithSense.wordSenses.forEach((wordSense) => {
            wordSense.globalIndex = this.globalIndex;
            this.globalIndex++;
            if (
              this.wordSenseIds &&
              this.wordSenseIds.some(
                (wordSenseId) => wordSenseId === wordSense.id
              )
            ) {
              controls.push(new FormControl(true));
              if (!wordWithSense.word.isChecked) {
                wordWithSense.word.isChecked = true;
              }
            } else {
              controls.push(new FormControl(false));
            }
          });
        });

        const formArray = new FormArray(controls, minSelectedCheckboxes());
        this.addWordSensesForm.setControl('selectedSenses', formArray);

        this.deckStateService.setIsLoading(false);
      },
      error: (err) => {
        this.toastService.showDangerToast(err.message);
        this.deckStateService.setIsLoading(false);
      },
    });
  }

  private addNextPageWordSenses(
    pageNumber: number,
    pageSize: number,
    infiniteScroll
  ) {
    this.wordService.getWordWithSensePaginated(pageNumber, pageSize).subscribe({
      next: (wordWithSenses) => {
        if (wordWithSenses && wordWithSenses.length > 0) {
          if (wordWithSenses.length < this.pageSize) this.hasMoreWords = false;

          this.wordWithSenses = [...this.wordWithSenses, ...wordWithSenses];

          wordWithSenses.forEach((wordWithSense) => {
            wordWithSense.wordSenses.forEach((wordSense) => {
              wordSense.globalIndex = this.globalIndex;
              this.globalIndex++;
              this.selectedSensesFormArray.push(new FormControl(false));
            });
          });
        } else {
          this.hasMoreWords = false;
        }

        infiniteScroll.target.complete();
      },
      error: (err) => {
        this.toastService.showDangerToast(err.message);
        infiniteScroll.target.complete();
      },
    });
  }
}
