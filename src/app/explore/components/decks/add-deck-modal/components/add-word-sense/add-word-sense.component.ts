import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
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
  @Output() validityChange = new EventEmitter<boolean>();
  @Output() isLoadingChange = new EventEmitter<boolean>();

  addWordSensesForm!: FormGroup;
  pageNumber = 1;
  pageSize = 10;
  isLoading = true;
  wordWithSenses: WordWithSense[] = [];

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
    this.getWordWithSensePaginated(this.pageSize, this.pageNumber);
    this.addWordSensesForm.statusChanges.subscribe((validity) =>
      validity === 'VALID'
        ? this.validityChange.emit(true)
        : this.validityChange.emit(false)
    );
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

  private getWordWithSensePaginated(pageSize: number, pageNumber: number) {
    this.isLoadingChange.emit(true);

    this.wordService.getWordWithSensePaginated(pageSize, pageNumber).subscribe({
      next: (wordWithSenses) => {
        this.wordWithSenses = wordWithSenses;

        const controls = [];
        let globalIndex = 0;
        this.wordWithSenses.forEach((wordWithSense) => {
          wordWithSense.wordSenses.forEach((wordSense) => {
            wordSense.globalIndex = globalIndex;
            globalIndex++;
            controls.push(new FormControl(false));
          });
        });

        const formArray = new FormArray(controls, minSelectedCheckboxes());
        this.addWordSensesForm.setControl('selectedSenses', formArray);

        this.isLoadingChange.emit(false);
        this.cdRef.detectChanges();
      },
      error: (err) => {
        this.toastService.showDangerToast(err.message);
      },
    });
  }
}
