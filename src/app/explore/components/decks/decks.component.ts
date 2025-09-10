import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AlertController, ModalController } from '@ionic/angular';

import { TranslocoService } from '@jsverse/transloco';

import { combineLatest, map } from 'rxjs';

import { Deck } from 'src/app/shared/models/deck.interface';
import { MessagingService } from 'src/app/shared/services/messaging.service';
import { InfoDeckModalComponent } from '../info-deck-modal/info-deck-modal.component';
import {
  AddEditOrInfo,
  DeckStateService,
} from './add-deck-modal/services/deck-state.service';
import { DeckService } from './services/deck.service';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.scss'],
})
export class DecksComponent implements OnInit {
  isDecksComponent = true;
  decks: Deck[] = [];
  selectedDeck: Deck = null;
  isLoading: boolean = true;
  deckId: number;
  isEditDeckModalOpen = false;
  customActionSheetOptions = {
    header: '',
    subHeader: '',
  };
  isPlatformDesktop = signal<boolean>(false);

  constructor(
    private messagingService: MessagingService,
    private route: ActivatedRoute,
    private modalController: ModalController,
    private router: Router,
    private deckStateService: DeckStateService,
    private deckService: DeckService,
    private alertController: AlertController,
    private translocoService: TranslocoService,
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

    combineLatest([
      this.messagingService.getHome(),
      this.messagingService.getIsPlatformDesktop(),
    ])
      .pipe(
        map(([home, isPlatformDesktop]) => {
          if (home && home.decks) this.decks = home.decks;
          this.isLoading = false;
          this.isPlatformDesktop.set(isPlatformDesktop);
        }),
      )
      .subscribe();
  }

  async onClickOpenEditDeck(selectedDeck: Deck) {
    this.selectedDeck = selectedDeck;
    const modal = await this.modalController.create({
      component: InfoDeckModalComponent,
      componentProps: {
        selectedDeck: selectedDeck,
      },
      initialBreakpoint: 0.9,
    });
    await modal.present();
  }

  async presentIsDeckLimitReachedAlert() {
    const alert = await this.alertController.create({
      header: this.translocoService.translate(
        'explore.decks.is-deck-limit-reached-alert.title',
      ),
      message: this.translocoService.translate(
        'explore.decks.is-deck-limit-reached-alert.text',
      ),
      buttons: [this.translocoService.translate('global.accept')],
    });

    await alert.present();
  }

  onClickSetSelected(selectedDeck: Deck) {
    this.isEditDeckModalOpen = true;
    this.selectedDeck = selectedDeck;
  }

  setIsEditDeckModalOpenFalse() {
    this.isEditDeckModalOpen = false;
  }

  onClickNavigateAddDeck() {
    this.deckService
      .isDeckLimitNotReached()
      .subscribe((isDeckLimitNotReached) => {
        if (!isDeckLimitNotReached) {
          this.presentIsDeckLimitReachedAlert();
        } else {
          this.deckStateService.setAddEditOrInfo(AddEditOrInfo.ADD);
          this.router.navigate(['decks/add-deck']);
        }
      });
  }

  onClickNavigateExplore() {
    this.router.navigate(['tabs/explore']);
  }
}
