import { Component, OnInit } from '@angular/core';

import { TranslocoService } from '@jsverse/transloco';

import { WordTranslation } from '../shared/models/word-translation.model';
import { MessagingService } from '../shared/services/messaging.service';
import { Deck } from '../shared/models/deck.interface';
import { Goal } from '../home/models/goal.interface';
import { ToastService } from '../shared/services/toast.service';
import { WordTranslationService } from '../shared/services/word-translation.service';
import { DailyStats } from '../stats/models/daily-stats.interface';

@Component({
  selector: 'app-study',
  templateUrl: './study.page.html',
  styleUrls: ['./study.page.scss'],
})
export class StudyPage implements OnInit {
  wordTranslation: WordTranslation;
  decks: Deck[] = [];
  lastDeck: Deck;
  selectedDeckId: number;
  goal: Goal;
  stat: DailyStats;
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

    this.messagingService.getHome().subscribe((home) => {
      this.decks = home.decks;
      this.goal = home.goal;
      this.selectedDeckId = home.lastDeckId;
      this.lastDeck = this.decks.find(
        (deck) => deck.id === this.selectedDeckId
      );
      this.stat = home.weekStats.find((stat) => {
        let statDate =
          typeof stat.date === 'string' ? new Date(stat.date) : stat.date;
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        statDate.setHours(0, 0, 0, 0);

        return statDate.getTime() === today.getTime();
      });

      this.isLoading = false;
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
