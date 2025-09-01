import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ModalController } from '@ionic/angular';

import { TranslocoService } from '@jsverse/transloco';

import { startWith } from 'rxjs';

import { DeckWordPhraseTranslationService } from 'src/app/shared/services/deck-word-phrase-translation.service';
import { noWhitespaceValidator } from 'src/app/shared/validators/custom-validators';
import { DeckStateService } from '../../services/deck-state.service';

@Component({
  selector: 'app-add-title-description',
  templateUrl: './add-title-description.component.html',
  styleUrls: ['./add-title-description.component.scss'],
})
export class AddTitleDescriptionComponent implements OnInit {
  addTitleForm!: FormGroup;
  wordPhraseTranslationIds: number[] = [];
  customCharactersRemaining = '';

  constructor(
    private deckWordPhraseTranslationService: DeckWordPhraseTranslationService,
    private deckStateService: DeckStateService,
    private mondalController: ModalController,
    private translocoService: TranslocoService,
  ) {
    this.addTitleForm = new FormGroup({
      name: new FormControl<string>(null, [
        Validators.required,
        noWhitespaceValidator,
      ]),
      description: new FormControl<string>(null, [
        Validators.required,
        noWhitespaceValidator,
      ]),
    });
  }

  ngOnInit() {
    this.deckStateService.setIsLoading(true);
    this.deckStateService.setIsAddTitleItialized(true);

    this.translocoService
      .selectTranslate('global.characters-remaining')
      .subscribe((translation) => {
        this.customCharactersRemaining = translation;
      });

    this.deckStateService
      .getWordPhraseTranslationIds()
      .subscribe((wordPhraseTranslationIds) => {
        this.wordPhraseTranslationIds = wordPhraseTranslationIds;
        this.addTitleForm.controls.description.setValue(
          wordPhraseTranslationIds.length + ' mots dans le nouveau paquet',
        );
        this.deckStateService.setIsLoading(false);
      });

    this.addTitleForm.statusChanges
      .pipe(startWith(this.addTitleForm.status))
      .subscribe((validity) => {
        validity === 'VALID'
          ? this.deckStateService.setIsAddTitleDescriptionFormValid(true)
          : this.deckStateService.setIsAddTitleDescriptionFormValid(false);
      });
  }

  onSubmitAddDeck() {
    this.deckWordPhraseTranslationService
      .createDeckWithWordPhraseTranslation(
        this.addTitleForm.controls.name.getRawValue(),
        this.addTitleForm.controls.description.getRawValue(),
        this.wordPhraseTranslationIds,
      )
      .subscribe({ next: () => this.mondalController.dismiss(null) });
  }

  customCharactersRemainingFormatter = (
    inputLength: number,
    maxLength: number,
  ) => {
    return `${maxLength - inputLength} ` + this.customCharactersRemaining;
  };
}
