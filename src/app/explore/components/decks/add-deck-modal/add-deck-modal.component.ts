import {
  ChangeDetectorRef,
  Component,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';

import { ModalController } from '@ionic/angular';

import { AddDeckState, DeckStateService } from './services/deck-state.service';
import { AddWordSenseComponent } from './components/add-word-sense/add-word-sense.component';
import { AddTitleDescriptionComponent } from './components/add-title-description/add-title-description.component';
import { AddPhraseComponent } from './components/add-phrase/add-phrase.component';
import { combineLatest, map } from 'rxjs';

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

  isLoading = signal<boolean>(null);
  isActualFormValid = signal<boolean>(null);
  addDeckState = AddDeckState;
  actualState = signal<AddDeckState>(AddDeckState.WORD_SENSE);
  isFirstStep = signal<boolean>(null);
  isLastStep = signal<boolean>(null);
  isAddWordSenseInitialized = signal<boolean>(null);
  isAddPhraseInitialized = signal<boolean>(null);
  isAddTitleItialized = signal<boolean>(null);

  constructor(
    private deckStateService: DeckStateService,
    private modalController: ModalController,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    combineLatest([
      this.deckStateService.getIsLoading(),
      this.deckStateService.getAddDeckState(),
      this.deckStateService.getIsFirstStep(),
      this.deckStateService.getIsLastStep(),
      this.deckStateService.getIsAddWordSenseInitialized(),
      this.deckStateService.getIsAddPhraseInitialized(),
      this.deckStateService.getIsAddTitleItialized(),
      this.deckStateService.getIsActualFormValid(),
    ])
      .pipe(
        map(
          ([
            isLoading,
            actualState,
            isFirstStep,
            isLastStep,
            isAddWordSenseInitialized,
            isAddPhraseInitialized,
            isAddTitleItialized,
            isActualFormValid,
          ]) => {
            this.isLoading.set(isLoading);
            this.actualState.set(actualState);
            this.isFirstStep.set(isFirstStep);
            this.isLastStep.set(isLastStep);
            this.isAddWordSenseInitialized.set(isAddWordSenseInitialized);
            this.isAddPhraseInitialized.set(isAddPhraseInitialized);
            this.isAddTitleItialized.set(isAddTitleItialized);
            this.isActualFormValid.set(isActualFormValid);
            // this.cdRef.detectChanges();
          }
        )
      )
      .subscribe({
        next: () => {
          this.isLoading.set(false);
        },
        error: (err) => {
          this.isLoading.set(false);
        },
      });
  }

  onClickBack() {
    this.deckStateService.setPreviousState();
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
