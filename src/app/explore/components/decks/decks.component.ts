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
import { ToastService } from 'src/app/shared/services/toast.service';

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
    private toastService: ToastService,
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

  async onClickOpenInfoDeck(selectedDeck: Deck) {
    this.selectedDeck = selectedDeck;
    const modal = await this.modalController.create({
      component: InfoDeckModalComponent,
      componentProps: {
        selectedDeck: selectedDeck,
      },
      initialBreakpoint: 0.9,
    });

    await modal.present();
    modal.onDidDismiss().then((deck) => {
      this.updateDeckEndDate(deck.data);
    });
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

  async onClickPresentRemoveDeckAlert(deck: Deck) {
    let deckName = deck.name ? deck.name : '';

    const alert = await this.alertController.create({
      header: this.translocoService.translate(
        'explore.decks.update-end-date-alert.title',
        { deckName: deckName },
      ),
      message: this.translocoService.translate(
        'explore.decks.update-end-date-alert.text',
      ),
      buttons: [
        {
          text: this.translocoService.translate('global.cancel'),
          role: 'cancel',
        },
        {
          text: this.translocoService.translate('global.accept'),
          role: 'confirm',
          handler: () => {
            this.updateDeckEndDate(deck);
          },
        },
      ],
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

  onClickNavigateStudy() {
    this.router.navigate(['tabs/study']);
  }

  onClickEditDeck(selectedDeck: Deck) {
    this.selectedDeck = selectedDeck;
    this.deckStateService.setAddEditOrInfo(AddEditOrInfo.EDIT);
    this.deckStateService.setSelectedDeck(this.selectedDeck);
    this.router.navigate(['decks/edit-deck']);
  }

  private getActiveDecks() {
    this.isLoading = true;
    this.deckService.getActiveDecks().subscribe((decks) => {
      this.decks = decks;
      this.messagingService.setDecksHome(decks);
      this.isLoading = false;
    });
  }

  private updateDeckEndDate(deck: Deck) {
    const deckName = deck.name ? deck.name : '';
    this.deckService.updateDeckEndDate(deck.id).subscribe((deck) => {
      this.toastService.showSuccessToast(deckName + ' eliminado con éxito');
      this.getActiveDecks();
    });
  }
}
