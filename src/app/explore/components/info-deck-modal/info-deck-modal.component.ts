import { ChangeDetectorRef, Component, Input, signal } from '@angular/core';
import { Router } from '@angular/router';

import { ModalController } from '@ionic/angular';

import { Deck } from 'src/app/shared/models/deck.interface';
import { PhraseTranslationWithWordTranslations } from 'src/app/shared/models/phrase.interface';
import { WordWithAttemptsAndSuccess } from 'src/app/shared/models/word.interface';
import { DeckWordPhraseTranslationService } from 'src/app/shared/services/deck-word-phrase-translation.service';
import { PhraseService } from 'src/app/shared/services/phrase.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { WordTranslationService } from 'src/app/shared/services/word-translation.service';
import {
  AddEditOrInfo,
  DeckStateService,
} from '../decks/add-deck-modal/services/deck-state.service';

@Component({
  selector: 'app-info-deck-modal',
  templateUrl: './info-deck-modal.component.html',
  styleUrls: ['./info-deck-modal.component.scss'],
})
export class InfoDeckModalComponent {
  @Input() isEditDeckModalOpen = false;
  @Input() selectedDeck: Deck;

  isLoading = false;
  hasLoadWords = false;
  hasLoadPhrases = false;
  phrasesWithWordTranslations: PhraseTranslationWithWordTranslations[] = [];
  // wordTranslationsWithPhrases: WordTranslationWithPhraseTranslations[] = [];
  selectedSegment = 'info';
  pageNumber = signal<number>(0);
  pageSize = signal<number>(10);
  wordWithAttemptsAndSuccess: WordWithAttemptsAndSuccess[] = [];

  constructor(
    private phraseService: PhraseService,
    private toastService: ToastService,
    private wordTranslationService: WordTranslationService,
    private deckWordPhraseTranslationService: DeckWordPhraseTranslationService,
    private cdRef: ChangeDetectorRef,
    private modalController: ModalController,
    private deckStateService: DeckStateService,
    private router: Router,
  ) {}

  onChangeSegment(selectedSegment: string) {
    console.log('getWordWithAttemptsAndSuccessPaginated');
    if (selectedSegment === 'words' && !this.hasLoadWords) {
      this.isLoading = true;
      this.hasLoadWords = true;
      this.deckWordPhraseTranslationService
        .getWordsWithAttemptsAndSuccessPaginatedByDeckId(
          this.selectedDeck.id,
          this.pageNumber(),
          this.pageSize(),
        )
        .subscribe({
          next: (wordWithAttemptsAndSuccess) => {
            this.wordWithAttemptsAndSuccess = wordWithAttemptsAndSuccess;
            this.pageNumber.set(this.pageNumber() + 1);
            this.isLoading = false;
          },
          error: (err) => {
            this.isLoading = false;
            this.toastService.showDangerToast(err.message);
          },
        });
      // this.wordTranslationService
      //   .getAllWordTranslationWithPhrasesByDeck(this.selectedDeck.id)
      //   .subscribe({
      //     next: (wordTranslationsWithPhrases) => {
      //       this.wordTranslationsWithPhrases = wordTranslationsWithPhrases;
      //       this.isLoading = false;
      //     },
      //     error: (err) => {
      //       this.toastService.showDangerToast(err.message);
      //       this.isLoading = false;
      //     },
      //   });
    }
    if (selectedSegment === 'phrases' && !this.hasLoadPhrases) {
      this.isLoading = true;
      this.hasLoadPhrases = true;
      this.phraseService
        .getAllPhrasesWithWordTranslationsByDeck(this.selectedDeck.id)
        .subscribe({
          next: (phrasesWithWordTranslations) => {
            this.phrasesWithWordTranslations = phrasesWithWordTranslations;
            this.isLoading = false;
          },
          error: (err) => {
            this.toastService.showDangerToast(err.message);
            this.isLoading = false;
          },
        });
    }
  }

  onClickGetWordSensesWithInfoByWord(word: WordWithAttemptsAndSuccess) {
    word.word.isLoading = true;
    // this.cdRef.detectChanges();
    this.deckWordPhraseTranslationService
      .getWordSenseInfosWithoutWordByWordIdAndDeckId(
        this.selectedDeck.id,
        word.word.id,
      )
      .subscribe((data) => {
        console.log(data);
        word.wordSenseInfoWithoutWord = data;
        word.word.isLoading = false;
      });
    console.log(word);
  }

  onClickEditDeck() {
    this.modalController.dismiss();
    this.deckStateService.setAddEditOrInfo(AddEditOrInfo.EDIT);
    this.deckStateService.setSelectedDeck(this.selectedDeck);
    this.router.navigate(['decks/edit-deck']);
  }
}
