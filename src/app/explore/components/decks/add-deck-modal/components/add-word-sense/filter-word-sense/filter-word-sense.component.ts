import { Component, OnInit, signal } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

import { ModalController, Platform } from '@ionic/angular';

import { DeckStateService } from '../../../services/deck-state.service';
import { WordService } from 'src/app/shared/services/word.service';
import {
  WordFilterOptions,
  WordFilterRequest,
} from 'src/app/shared/models/word-filter.model';

@Component({
  selector: 'app-filter-word-sense',
  templateUrl: './filter-word-sense.component.html',
  styleUrls: ['./filter-word-sense.component.scss'],
})
export class FilterWordSenseComponent implements OnInit {
  addWordSenseFilterForm: FormGroup;
  isPlatformDesktop = signal<boolean>(null);
  wordFilterOptions: WordFilterOptions;
  wordFilterRequestSelected: WordFilterRequest = {
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

  isLoading = signal(true);

  constructor(
    private platform: Platform,
    private wordService: WordService,
    private fb: FormBuilder,
    private deckStateService: DeckStateService,
    private modalController: ModalController,
  ) {
    this.addWordSenseFilterForm = this.fb.group(
      {
        successesAccuracyRange: new FormControl({ lower: null, upper: null }),
        textFiltered: new FormControl([]),
        selectedPartSpeeches: new FormArray([]),
        selectedLevels: new FormArray([]),
        selectedCategories: new FormArray([]),
        selectedPersons: new FormArray([]),
        selectedGenders: new FormArray([]),
        selectedNumbers: new FormArray([]),
        selectedMoods: new FormArray([]),
        selectedTenses: new FormArray([]),
      },
      { validators: this.atLeastOneFilterSelected },
    );
  }

  ngOnInit() {
    // this.deckStateService
    //   .getWordFilterRequest()
    //   .subscribe(
    //     (wordFilterRequestSelected) =>
    //       (this.wordFilterRequestSelected = wordFilterRequestSelected),
    //   );

    this.wordService
      .getAllWordFilterOptions()
      .subscribe((wordFilterOptions) => {
        this.wordFilterOptions = wordFilterOptions;

        this.initFormArray('partSpeeches', 'selectedPartSpeeches', 'code');
        this.initFormArray('levels', 'selectedLevels', 'code');
        this.initFormArray('categories', 'selectedCategories', 'id');
        this.initFormArray('persons', 'selectedPersons', 'code');
        this.initFormArray('genders', 'selectedGenders', 'code');
        this.initFormArray('numbers', 'selectedNumbers', 'code');
        this.initFormArrayTenses();
        // this.initFormArray('moodWithTenses', 'selectedTenses', 'code');

        this.isLoading.set(false);
      });

    this.isPlatformDesktop.set(this.platform.is('desktop'));
  }

  get selectedPartSpeechesFormArray() {
    return this.addWordSenseFilterForm.get('selectedPartSpeeches') as FormArray;
  }

  get selectedLevelsFormArray() {
    return this.addWordSenseFilterForm.get('selectedLevels') as FormArray;
  }

  get selectedCategoriesFormArray() {
    return this.addWordSenseFilterForm.get('selectedCategories') as FormArray;
  }

  get selectedPersonsFormArray() {
    return this.addWordSenseFilterForm.get('selectedPersons') as FormArray;
  }

  get selectedGendersFormArray() {
    return this.addWordSenseFilterForm.get('selectedGenders') as FormArray;
  }

  get selectedNumbersFormArray() {
    return this.addWordSenseFilterForm.get('selectedNumbers') as FormArray;
  }

  get selectedMoodsFormArray() {
    return this.addWordSenseFilterForm.get('selectedMoods') as FormArray;
  }

  get selectedTensesFormArray() {
    return this.addWordSenseFilterForm.get('selectedTenses') as FormArray;
  }

  onSubmitAppyFilters() {
    this.deckStateService.setWordFilterRequest(this.wordFilterRequestSelected);
    this.deckStateService.addwordFilterRequestAvailables(
      this.wordFilterRequestSelected,
    );
    this.modalController.dismiss(this.wordFilterRequestSelected);
  }

  onClickBack() {
    this.modalController.dismiss(this.wordFilterRequestSelected);
  }

  atLeastOneFilterSelected: ValidatorFn = (
    control: FormGroup,
  ): ValidationErrors | null => {
    const successesAccuracyRangeControl = control.get('successesAccuracyRange');
    const textFilteredControl = control.get('textFiltered');
    const formArraysCheckboxControls = [
      control.get('selectedPartSpeeches') as FormArray,
      control.get('selectedLevels') as FormArray,
      control.get('selectedCategories') as FormArray,
      control.get('selectedPersons') as FormArray,
      control.get('selectedGenders') as FormArray,
      control.get('selectedNumbers') as FormArray,
      control.get('selectedMoods') as FormArray,
      control.get('selectedTenses') as FormArray,
    ];

    const isSuccessesAccuracyRangeControlValid =
      successesAccuracyRangeControl.value.upper != null ||
      successesAccuracyRangeControl.value.lower != null;
    const isTextFilteredControlValid = textFilteredControl.value != null;
    const hasSelectedCheckbox = formArraysCheckboxControls.some((array) => {
      if (!array) return false;
      return array.controls.some((control) => control.value === true);
    });

    return isSuccessesAccuracyRangeControlValid ||
      isTextFilteredControlValid ||
      hasSelectedCheckbox
      ? null
      : { atLeastOneFilterRequired: true };
  };

  onChangeSuccessesAccuracyRange(selectedAccuracyRange) {
    this.wordFilterRequestSelected.maxAccuracy =
      selectedAccuracyRange.detail.value.upper;
    this.wordFilterRequestSelected.minAccuracy =
      selectedAccuracyRange.detail.value.lower;
  }

  onChangeSelectedPartSpeeches(event, partSpeech) {
    if (event.detail.checked) {
      this.wordFilterRequestSelected.partSpeeches.push(partSpeech);
    } else {
      this.wordFilterRequestSelected.partSpeeches.filter(
        (partSpeech) => partSpeech.id != partSpeech.id,
      );
    }
  }

  onChangeSelectedLevels(event, level) {
    if (event.detail.checked) {
      this.wordFilterRequestSelected.levels.push(level);
    } else {
      this.wordFilterRequestSelected.levels.filter(
        (level) => level.id != level.id,
      );
    }
  }

  onChangeSelectedCategories(event, category) {
    if (event.detail.checked) {
      this.wordFilterRequestSelected.categories.push(category);
    } else {
      this.wordFilterRequestSelected.categories.filter(
        (category) => category.id != category.id,
      );
    }
  }

  onChangeSelectedPersons(event, person) {
    if (event.detail.checked) {
      this.wordFilterRequestSelected.persons.push(person);
    } else {
      this.wordFilterRequestSelected.persons.filter(
        (person) => person.id != person.id,
      );
    }
  }

  onChangeSelectedGenders(event, gender) {
    if (event.detail.checked) {
      this.wordFilterRequestSelected.genders.push(gender);
    } else {
      this.wordFilterRequestSelected.genders.filter(
        (gender) => gender.id != gender.id,
      );
    }
  }

  onChangeSelectedNumbers(event, number) {
    if (event.detail.checked) {
      this.wordFilterRequestSelected.numbers.push(number);
    } else {
      this.wordFilterRequestSelected.numbers.filter(
        (number) => number.id != number.id,
      );
    }
  }

  onChangeSelectedTenses(event, tense, mood) {
    if (event.detail.checked) {
      tense.mood = mood;
      this.wordFilterRequestSelected.tenses.push(tense);
    } else {
      this.wordFilterRequestSelected.tenses.filter(
        (tense) => tense.code != tense.code,
      );
    }
  }

  getWordSenseFilterSelected(event) {
    this.wordFilterRequestSelected.textFiltered = event.detail.value
      .trim()
      .split(/\s+/);
  }

  private initFormArray(
    sourceProperty: keyof WordFilterOptions,
    formArrayName: string,
    compareField: string,
  ): void {
    const sourceArray = this.wordFilterOptions[sourceProperty];
    const selectedArray =
      this.wordFilterRequestSelected?.[sourceProperty] || [];
    let globalIndex = 0;

    const controls = sourceArray.map((item) => {
      item.globalIndex = globalIndex;
      globalIndex++;
      const isSelected = selectedArray.some(
        (selectedItem) => item[compareField] === selectedItem[compareField],
      );
      return new FormControl(isSelected);
    });

    const formArray = new FormArray(controls);
    this.addWordSenseFilterForm.setControl(formArrayName, formArray);
  }

  private initFormArrayTenses() {
    let globalIndex = 0;

    const controls = [];
    this.wordFilterOptions.moodWithTenses.forEach((moodWithTense) => {
      moodWithTense.tenses.forEach((tense) => {
        tense.globalIndex = globalIndex;
        tense.isChecked = false;
        globalIndex++;
        controls.push(new FormControl(false));
      });
    });
  }
}
