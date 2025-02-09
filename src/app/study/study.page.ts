import { Component, OnInit } from '@angular/core';

import { TranslocoService } from '@jsverse/transloco';

import { WordTranslation } from '../shared/models/word-translation.model';

import { MessagingService } from '../shared/services/messaging.service';
import { Deck } from '../shared/models/deck.interface';
import { Goal } from '../home/models/goal.interface';
import { switchMap } from 'rxjs';
import { ToastService } from '../shared/services/toast.service';
import { WordTranslationService } from '../shared/services/word-translation.service';

@Component({
  selector: 'app-study',
  templateUrl: './study.page.html',
})
export class StudyPage implements OnInit {
  wordTranslation: WordTranslation;
  decks: Deck[] = [];
  lastDeck: Deck;
  selectedDeckId: number;
  goal: Goal;
  isLoading = true;
  customActionSheetOptions = {
    header: '',
    subHeader: '',
  };

  constructor(
    private wordTranslationService: WordTranslationService,
    private messagingService: MessagingService,
    private translocoService: TranslocoService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.translocoService
      .selectTranslateObject('study.select-deck')
      .subscribe((translations) => {
        this.customActionSheetOptions.header = translations['selected-deck'];
        this.customActionSheetOptions.subHeader =
          translations['select-deck-to-practise'];
      });

    this.messagingService
      .getHome()
      .pipe(
        switchMap((home) => {
          this.decks = home.decks;
          this.goal = home.goal;
          this.selectedDeckId = home.lastDeckId;
          this.lastDeck = this.decks.find(
            (deck) => deck.id === this.selectedDeckId
          );
          this.isLoading = false;
          return this.wordTranslationService.getRandomWordTranslation(
            this.selectedDeckId
          );
        })
      )
      .subscribe({
        next: (wordTranslation) => {
          this.wordTranslation = wordTranslation;
        },
        error: (err) => this.toastService.showDangerToast(err.error.message),
      });
  }

  onChangeDeck(deckId: number) {
    this.wordTranslationService
      .getRandomWordTranslation(deckId)
      .subscribe((wordTranslation) => {
        this.wordTranslation = wordTranslation;
      });
  }
}
