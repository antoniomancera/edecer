import { Component, OnInit, signal, ViewChild } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { AddDeckState, DeckStateService } from './services/deck-state.service';
import { AddWordSenseComponent } from './components/add-word-sense/add-word-sense.component';
import { AddTitleDescriptionComponent } from './components/add-title-description/add-title-description.component';
import { AddPhraseComponent } from './components/add-phrase/add-phrase.component';

@Component({
  selector: 'app-add-deck-modal',
  templateUrl: './add-deck-modal.component.html',
  styleUrls: ['./add-deck-modal.component.scss'],
})
export class AddDeckModalComponent implements OnInit {
  @ViewChild('addWordSense')
  addWordSense!: AddWordSenseComponent;
  @ViewChild('addPhrase') addPhrase!: AddPhraseComponent;
  @ViewChild('addTitleDescription')
  addTitleDescription!: AddTitleDescriptionComponent;

  isActualFormValid = false;
  isLoading = true;
  addDeckState: any = AddDeckState;
  actualState = signal<AddDeckState>(AddDeckState.WORD_SENSE);

  constructor(
    private deckStateService: DeckStateService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.deckStateService.getAddDeckState().subscribe((state) => {
      this.actualState.set(state);
    });
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  setIsActualFormValid(event: boolean) {
    this.isActualFormValid = event;
  }

  onClickBack() {
    if (this.actualState() === AddDeckState.PHRASE) {
      this.actualState.set(AddDeckState.WORD_SENSE);
    }
    if (this.actualState() === AddDeckState.TITLE) {
      this.actualState.set(AddDeckState.PHRASE);
    }
  }

  onClickSubmit() {
    if (this.actualState() === AddDeckState.WORD_SENSE) {
      this.addWordSense.onSubmitSelectPhrases();
    } else if (this.actualState() === AddDeckState.PHRASE) {
      this.addPhrase.onSubmitSelectTitle();
    } else if (this.actualState() === AddDeckState.TITLE) {
      this.addTitleDescription.onSubmitAddDeck();
    }
  }

  closeModal() {
    this.modalController.dismiss(null);
  }
}
