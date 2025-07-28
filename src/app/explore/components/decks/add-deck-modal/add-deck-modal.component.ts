import { Component, OnInit } from '@angular/core';

import { AddDeckState, DeckStateService } from './services/deck-state.service';

@Component({
  selector: 'app-add-deck-modal',
  templateUrl: './add-deck-modal.component.html',
  styleUrls: ['./add-deck-modal.component.scss'],
})
export class AddDeckModalComponent implements OnInit {
  addDeckState: any = AddDeckState;
  actualState: AddDeckState;

  constructor(private deckStateService: DeckStateService) {}
  ngOnInit() {
    this.deckStateService
      .getAddDeckState()
      .subscribe((addDeckState) => (this.actualState = addDeckState));
  }

  get addDeckStateIndex(): number {
    switch (this.actualState) {
      case AddDeckState.WORD_SENSE:
        return 0;
      case AddDeckState.PHRASE:
        return 1;
      case AddDeckState.TITLE:
        return 2;
      default:
        return 0;
    }
  }
}
