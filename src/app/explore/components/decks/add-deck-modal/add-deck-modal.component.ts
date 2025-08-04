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

  isActualFormValid = false;
  isLoading = false;
  addDeckState = AddDeckState;
  actualState = signal<AddDeckState>(AddDeckState.WORD_SENSE);
  isFirstStep = signal<boolean>(null);
  isLastStep = signal<boolean>(null);

  constructor(
    private deckStateService: DeckStateService,
    private modalController: ModalController,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    combineLatest([
      this.deckStateService.getAddDeckState(),
      this.deckStateService.getIsFirstStep(),
      this.deckStateService.getIsLastStep(),
    ])
      .pipe(
        map(([state, isFirstStep, isLastStep]) => {
          this.actualState.set(state);
          this.isFirstStep.set(isFirstStep);
          this.isLastStep.set(isLastStep);
          this.cdRef.detectChanges();
        })
      )
      .subscribe({
        next: () => {
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
        },
      });
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  setIsActualFormValid(event: boolean) {
    this.isActualFormValid = event;
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
