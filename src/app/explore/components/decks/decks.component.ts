import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Deck } from 'src/app/shared/models/deck.interface';
import { MessagingService } from 'src/app/shared/services/messaging.service';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.scss'],
})
export class DecksComponent implements OnInit {
  decks: Deck[] = [];
  selectedDeck: Deck = null;
  isLoading: boolean = true;
  deckId: number;
  isEditDeckModalOpen = false;
  customActionSheetOptions = {
    header: '',
    subHeader: '',
  };
  constructor(
    private messagingService: MessagingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const deckId = +params.deckId;
      if (deckId) {
        this.deckId = deckId;
      } else {
        this.deckId = undefined;
      }
    });
    this.messagingService.getHome().subscribe((home) => {
      if (home && home.decks) this.decks = home.decks;
      this.isLoading = false;
    });
  }

  onClickSetSelected(selectedDeck: Deck) {
    this.isEditDeckModalOpen = true;
    this.selectedDeck = selectedDeck;
  }

  setIsEditDeckModalOpenFalse() {
    this.isEditDeckModalOpen = false;
  }
}
