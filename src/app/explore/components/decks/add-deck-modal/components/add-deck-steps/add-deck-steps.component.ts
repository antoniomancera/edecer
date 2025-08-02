import { Component, OnInit } from '@angular/core';

import { DeckStateService } from '../../services/deck-state.service';

@Component({
  selector: 'app-add-deck-steps',
  templateUrl: './add-deck-steps.component.html',
  styleUrls: ['./add-deck-steps.component.scss'],
})
export class AddDeckStepsComponent implements OnInit {
  actualStateIndex: number = 0;
  constructor(private deckStateService: DeckStateService) {}
  ngOnInit() {
    this.deckStateService
      .getAddDeckStateIndex()
      .subscribe(
        (actualStateIndex) => (this.actualStateIndex = actualStateIndex)
      );
  }
}
