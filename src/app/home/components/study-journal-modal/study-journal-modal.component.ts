import { Component, Input, OnInit } from '@angular/core';

import { TranslocoService } from '@jsverse/transloco';

import { Deck } from 'src/app/shared/models/deck.interface';
import { DeckWordTranslationHistorialService } from 'src/app/shared/services/deck-word-translation-historial.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { DailyStats } from 'src/app/stats/models/daily-stats.interface';
import { DeckWordTranslationHistorial } from 'src/app/stats/models/deck-word-translation-historial.interface';
import { Goal } from '../../models/goal.interface';

@Component({
  selector: 'app-study-journal-modal',
  templateUrl: './study-journal-modal.component.html',
  styleUrls: ['./study-journal-modal.component.scss'],
})
export class StudyJournalModalComponent implements OnInit {
  @Input() date: string = '';
  @Input() decks: Deck[] = [];
  @Input() goal: Goal;
  @Input() stat: DailyStats;

  historialList: DeckWordTranslationHistorial[] = [];
  errorMessage = '';
  selectedDeck = 0;

  constructor(
    private deckWordTranslationHistorialService: DeckWordTranslationHistorialService,
    private toastService: ToastService,
    private translocoService: TranslocoService
  ) {}

  ngOnInit() {
    this.deckWordTranslationHistorialService
      .getDeckWordTranslationHistorialByDayMillis(Date.parse(this.date))
      .subscribe({
        next: (historialList) => (this.historialList = historialList),
        error: (err) => {
          this.errorMessage = this.translocoService.translate(
            'global.error.' + err.error.errorCode,
            { date: this.date }
          );
          this.toastService.showDangerToast(this.errorMessage);
        },
      });
  }

  setSelectedDeck(deckId?: number) {
    if (deckId) {
      this.selectedDeck = deckId;
    } else {
      this.selectedDeck = 0;
    }
  }
}
