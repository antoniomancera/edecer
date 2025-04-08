import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { Deck } from 'src/app/shared/models/deck.interface';
import { MessagingService } from 'src/app/shared/services/messaging.service';
import { EditDeckModalComponent } from '../edit-deck-modal/edit-deck-modal.component';

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
    private route: ActivatedRoute,
    private modalController: ModalController
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

  async onClickOpenEditDeck(selectedDeck: Deck) {
    this.selectedDeck = selectedDeck;
    const modal = await this.modalController.create({
      component: EditDeckModalComponent,
      componentProps: {
        selectedDeck: selectedDeck,
      },

      initialBreakpoint: 0.9,
    });
    await modal.present();
  }

  onClickSetSelected(selectedDeck: Deck) {
    this.isEditDeckModalOpen = true;
    this.selectedDeck = selectedDeck;
  }

  setIsEditDeckModalOpenFalse() {
    this.isEditDeckModalOpen = false;
  }
}
