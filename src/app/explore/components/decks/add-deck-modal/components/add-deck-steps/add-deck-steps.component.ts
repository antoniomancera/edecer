import { Component, OnInit, signal } from '@angular/core';

import { DeckStateService } from '../../services/deck-state.service';
import { combineLatest, map } from 'rxjs';
import { Deck } from 'src/app/shared/models/deck.interface';

@Component({
  selector: 'app-add-deck-steps',
  templateUrl: './add-deck-steps.component.html',
  styleUrls: ['./add-deck-steps.component.scss'],
})
export class AddDeckStepsComponent implements OnInit {
  actualStateIndex = signal<number>(0);
  selectedDeck = signal<Deck>(null);
  constructor(private deckStateService: DeckStateService) {}
  ngOnInit() {
    combineLatest([
      this.deckStateService.getAddDeckStateIndex(),
      this.deckStateService.getSelectedDeck(),
      this.deckStateService.getSelectedDeck(),
    ])
      .pipe(
        map(([actualStateIndex, selectedDeck]) => {
          this.actualStateIndex.set(actualStateIndex);
          this.selectedDeck.set(selectedDeck);
        }),
      )
      .subscribe();
  }
}
