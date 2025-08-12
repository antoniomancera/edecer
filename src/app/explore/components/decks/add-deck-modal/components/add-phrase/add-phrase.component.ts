import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { minSelectedCheckboxes } from 'src/app/shared/validators/custom-validators';
import { DeckStateService } from '../../services/deck-state.service';
import { WordPhraseTranslationService } from 'src/app/shared/services/word-phrase-translation.service';
import { WordPhraseTranslation } from 'src/app/shared/models/word-phrase-translation.model';

@Component({
  selector: 'app-add-phrase',
  templateUrl: './add-phrase.component.html',
  styleUrls: ['./add-phrase.component.scss'],
})
export class AddPhraseComponent implements OnInit {
  addPhrasesForm!: FormGroup;
  wordPhraseTranslations: WordPhraseTranslation[] = [];

  constructor(
    private deckStateService: DeckStateService,
    private wordPhraseTranslationService: WordPhraseTranslationService,
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef
  ) {
    this.addPhrasesForm = this.fb.group({
      selectedPhrases: new FormArray([], minSelectedCheckboxes()),
    });
  }

  ngOnInit() {
    this.deckStateService.setIsLoading(true);
    this.deckStateService.setIsAddPhraseInitialized(true);

    this.deckStateService.getWordSenseIds().subscribe((wordSenseIds) => {
      this.wordPhraseTranslationService
        .getAllWordPhraseTranslationByWordSense(wordSenseIds)
        .subscribe((wordPhraseTranslations) => {
          this.wordPhraseTranslations = wordPhraseTranslations;
          const controls = [];
          let globalIndex = 0;
          this.wordPhraseTranslations.forEach((wordPhraseTranslation) => {
            wordPhraseTranslation.globalIndex = globalIndex;
            globalIndex++;
            controls.push(new FormControl(true));
          });

          const formArray = new FormArray(controls, minSelectedCheckboxes());
          this.addPhrasesForm.setControl('selectedPhrases', formArray);
        });
    });

    this.addPhrasesForm.statusChanges.subscribe((validity) => {
      validity === 'VALID'
        ? this.deckStateService.setIsAddPhraseFormValid(true)
        : this.deckStateService.setIsAddPhraseFormValid(false);
    });
  }

  get selectedPhrasesFormArray() {
    return this.addPhrasesForm.get('selectedPhrases') as FormArray;
  }

  onSubmitSelectTitle() {
    let wordPhraseTranslationIds: number[] = [];

    let globalIndex = 0;
    this.wordPhraseTranslations.forEach((wordPhraseTranslation) => {
      const control = this.selectedPhrasesFormArray.at(globalIndex);
      if (control?.value && wordPhraseTranslation.id != null) {
        wordPhraseTranslationIds.push(wordPhraseTranslation.id);
      }
      globalIndex++;
    });
    this.deckStateService.setWordPhraseTranslationIds(wordPhraseTranslationIds);
    this.deckStateService.setNextState();
    // this.cdRef.detectChanges();
  }
}
