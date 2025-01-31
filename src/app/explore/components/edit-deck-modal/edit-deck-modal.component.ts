import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Deck } from 'src/app/shared/models/deck.interface';
import { PhraseWithWordTranslations } from 'src/app/shared/models/phrase.interface';
import { PhraseService } from 'src/app/shared/services/phrase.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-edit-deck-modal',
  templateUrl: './edit-deck-modal.component.html',
  styleUrls: ['./edit-deck-modal.component.scss'],
})
export class EditDeckModalComponent implements OnInit {
  @Input() isEditDeckModalOpen = false;
  @Input() selectedDeck: Deck;

  @Output() setIsEditDeckModalOpenFalse = new EventEmitter();

  isLoading = true;
  phrasesWithWordTranslations: PhraseWithWordTranslations[] = [];

  constructor(
    private phraseService: PhraseService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.phraseService
      .getAllPhrasesWithWordTranslationsByDeck(this.selectedDeck.id)
      .subscribe({
        next: (phrasesWithWordTranslations) => {
          this.phrasesWithWordTranslations = phrasesWithWordTranslations;
          this.isLoading = false;
        },
        error: (err) => {
          this.toastService.showDangerToast(err.message);
          this.isLoading = false;
        },
      });
  }

  onModalDismiss() {
    this.setIsEditDeckModalOpenFalse.emit();
  }
}
