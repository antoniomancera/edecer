import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor(
    private deckWordPhraseTranslationService: DeckWordPhraseTranslationService,
    private deckStateService: DeckStateService
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
    this.deckStateService
      .getWordPhraseTranslationIds()
      .subscribe(
        (wordPhraseTranslationIds) =>
          (this.wordPhraseTranslationIds = wordPhraseTranslationIds)
      );
  }

  addDeck() {
    this.deckWordPhraseTranslationService
      .createDeckWithWordPhraseTranslation(
        this.addTitleForm.controls.name.getRawValue(),
        this.addTitleForm.controls.description.getRawValue(),
        this.wordPhraseTranslationIds
      )
      .subscribe();
  }
}
