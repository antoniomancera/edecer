import { Component, OnInit, signal } from '@angular/core';

import { MessagingService } from '../shared/services/messaging.service';
import { Deck } from '../shared/models/deck.interface';
import { Goal } from '../home/models/goal.interface';
import { DailyStats } from '../stats/models/daily-stats.interface';
import { WordPhraseTranslation } from '../shared/models/word-phrase-translation.model';
import { DeckWordPhraseTranslationService } from '../shared/services/deck-word-phrase-translation.service';
import { combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-study',
  templateUrl: './study.page.html',
  styleUrls: ['./study.page.scss'],
})
export class StudyPage implements OnInit {
  isPlatformDesktop = signal<boolean>(false);
  isStudyPage = signal<boolean>(true);
  wordPhraseTranslation: WordPhraseTranslation;
  decks: Deck[] = [];
  lastDeck: Deck;
  selectedDeckId: number;
  goal: Goal;
  stat: DailyStats;
  isLoading = true;

  constructor(
    private deckWordPhraseTranslationService: DeckWordPhraseTranslationService,
    private messagingService: MessagingService,
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.messagingService.getHome(),
      this.messagingService.getIsPlatformDesktop(),
    ])
      .pipe(
        map(([home, isPlatformDesktop]) => {
          this.isPlatformDesktop.set(isPlatformDesktop);
          this.decks = home.decks;
          this.goal = home.goal;
          this.selectedDeckId = home.lastDeckId
            ? home.lastDeckId
            : this.decks[0].id;
          this.lastDeck = this.decks.find(
            (deck) => deck.id === this.selectedDeckId,
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
        }),
      )
      .subscribe();
  }

  onChangeDeck(deckId: number) {
    this.selectedDeckId = deckId;
    this.deckWordPhraseTranslationService
      .getRandomWordPhraseTranslation(deckId)
      .subscribe((wordPhraseTranslation) => {
        this.wordPhraseTranslation = wordPhraseTranslation;
      });
  }
}
