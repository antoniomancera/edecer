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

import {
  Word,
  WordSenseFilter,
  WordSenseFilterArrays,
} from 'src/app/shared/models/word.interface';
import { WordSenseService } from 'src/app/shared/services/word-sense.service';
import { DeckStateService } from '../../../services/deck-state.service';

@Component({
  selector: 'app-filter-word-sense',
  templateUrl: './filter-word-sense.component.html',
  styleUrls: ['./filter-word-sense.component.scss'],
})
export class FilterWordSenseComponent implements OnInit {
  addWordSenseFilterForm: FormGroup;
  isPlatformDesktop = signal<boolean>(null);
  wordSenseFilter: WordSenseFilter;
  wordSenseFilterSelected: WordSenseFilter;

  isLoading = signal(true);

  constructor(
    private platform: Platform,
    private wordSenseService: WordSenseService,
    private fb: FormBuilder,
    private deckStateService: DeckStateService,
    private modalController: ModalController,
  ) {
    this.addWordSenseFilterForm = this.fb.group(
      {
        successesAccuracyRange: new FormControl({ lower: null, upper: null }),
        textFiltered: new FormControl([]),
        selectedTypes: new FormArray([]),
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
    this.deckStateService
      .getWordSenseFilter()
      .subscribe(
        (wordSenseFilter) => (this.wordSenseFilterSelected = wordSenseFilter),
      );

    this.wordSenseService
      .getAllWordSenseFilters()
      .subscribe((wordSenseFilter) => {
        this.wordSenseFilter = wordSenseFilter;

        this.initFormArray('types', 'selectedTypes', 'code');
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

  get selectedTypesFormArray() {
    return this.addWordSenseFilterForm.get('selectedTypes') as FormArray;
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

  private initFormArray(
    sourceProperty: keyof WordSenseFilterArrays,
    formArrayName: string,
    compareField: string,
  ): void {
    const sourceArray = this.wordSenseFilter[sourceProperty];
    const selectedArray = this.wordSenseFilterSelected?.[sourceProperty] || [];
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
    const sourceArray = this.wordSenseFilter.moodWithTenses;
    let globalIndex = 0;

    const controls = [];
    this.wordSenseFilter.moodWithTenses.forEach((moodWithTense) => {
      moodWithTense.tenses.forEach((tense) => {
        tense.globalIndex = globalIndex;
        tense.isChecked = false;
        globalIndex++;
        controls.push(new FormControl(false));
      });
    });
  }

  onSubmitAppyFilters() {
    this.deckStateService.setWordSenseFilter(this.wordSenseFilterSelected);
    this.modalController.dismiss();
  }

  atLeastOneFilterSelected: ValidatorFn = (
    control: FormGroup,
  ): ValidationErrors | null => {
    const successesAccuracyRangeControl = control.get('successesAccuracyRange');
    const textFilteredControl = control.get('textFiltered');
    const formArraysCheckboxControls = [
      control.get('selectedTypes') as FormArray,
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
    this.wordSenseFilterSelected.maxAccuracy =
      selectedAccuracyRange.detail.value.upper;
    this.wordSenseFilterSelected.minAccuracy =
      selectedAccuracyRange.detail.value.lower;
  }

  onChangeSelectedTypes(event, type) {
    if (event.detail.checked) {
      this.wordSenseFilterSelected.types.push(type);
    } else {
      this.wordSenseFilterSelected.types.filter((type) => type.id != type.id);
    }
  }
  onChangeSelectedLevels(event, level) {
    if (event.detail.checked) {
      this.wordSenseFilterSelected.levels.push(level);
    } else {
      this.wordSenseFilterSelected.levels.filter(
        (level) => level.id != level.id,
      );
    }
  }
  onChangeSelectedCategories(event, category) {
    if (event.detail.checked) {
      this.wordSenseFilterSelected.categories.push(category);
    } else {
      this.wordSenseFilterSelected.categories.filter(
        (category) => category.id != category.id,
      );
    }
  }
  onChangeSelectedPersons(event, person) {
    if (event.detail.checked) {
      this.wordSenseFilterSelected.persons.push(person);
    } else {
      this.wordSenseFilterSelected.persons.filter(
        (person) => person.id != person.id,
      );
    }
  }
  onChangeSelectedGenders(event, gender) {
    if (event.detail.checked) {
      this.wordSenseFilterSelected.genders.push(gender);
    } else {
      this.wordSenseFilterSelected.genders.filter(
        (gender) => gender.id != gender.id,
      );
    }
  }
  onChangeSelectedNumbers(event, number) {
    if (event.detail.checked) {
      this.wordSenseFilterSelected.numbers.push(number);
    } else {
      this.wordSenseFilterSelected.numbers.filter(
        (number) => number.id != number.id,
      );
    }
  }

  onChangeSelectedTenses(event, tense, mood) {
    if (event.detail.checked) {
      tense.mood = mood;
      this.wordSenseFilterSelected.tenses.push(tense);
    } else {
      this.wordSenseFilterSelected.tenses.filter(
        (tense) => tense.code != tense.code,
      );
    }
  }

  getWordSenseFilterSelected(event) {
    this.wordSenseFilterSelected.textFiltered = event.detail.value
      .trim()
      .split(/\s+/);
  }
}
