import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { WordWithSense } from 'src/app/shared/models/word.interface';
import { ToastService } from 'src/app/shared/services/toast.service';
import { WordService } from 'src/app/shared/services/word.service';
import { minSelectedCheckboxes } from 'src/app/shared/validators/custom-validators';
import {
  AddDeckState,
  DeckStateService,
} from '../../services/deck-state.service';
@Component({
  selector: 'app-add-word-sense',
  templateUrl: './add-word-sense.component.html',
  styleUrls: ['./add-word-sense.component.scss'],
})
export class AddWordSenseComponent implements OnInit {
  addWordSensesForm!: FormGroup;
  pageNumber = 1;
  pageSize = 10;
  isLoading = false;
  wordWithSenses: WordWithSense[] = [];

  constructor(
    private toastService: ToastService,
    private wordService: WordService,
    private fb: FormBuilder,
    private deckStateService: DeckStateService
  ) {
    this.addWordSensesForm = this.fb.group({
      selectedSenses: new FormArray([], minSelectedCheckboxes()),
    });
  }

  ngOnInit() {
    this.getWordWithSensePaginated(this.pageSize, this.pageNumber);
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
    this.deckStateService.setAddDeckState(AddDeckState.PHRASE);

    return wordSenseIds;
  }

  private getWordWithSensePaginated(pageSize: number, pageNumber: number) {
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
      },
      error: (err) => {
        this.toastService.showDangerToast(err.message);
      },
    });
  }
}
