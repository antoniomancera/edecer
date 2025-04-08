import { Component, Input } from '@angular/core';

import { Deck } from 'src/app/shared/models/deck.interface';
import { PhraseWithWordTranslations } from 'src/app/shared/models/phrase.interface';
import { WordTranslationWithPhrases } from 'src/app/shared/models/word-translation.model';
import { PhraseService } from 'src/app/shared/services/phrase.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { WordTranslationService } from 'src/app/shared/services/word-translation.service';

@Component({
  selector: 'app-edit-deck-modal',
  templateUrl: './edit-deck-modal.component.html',
  styleUrls: ['./edit-deck-modal.component.scss'],
})
export class EditDeckModalComponent {
  @Input() isEditDeckModalOpen = false;
  @Input() selectedDeck: Deck;

  isLoading = false;
  hasLoadWords = false;
  hasLoadPhrases = false;
  phrasesWithWordTranslations: PhraseWithWordTranslations[] = [];
  wordTranslationsWithPhrases: WordTranslationWithPhrases[] = [];
  selectedSegment = 'info';

  constructor(
    private phraseService: PhraseService,
    private toastService: ToastService,
    private wordTranslationService: WordTranslationService
  ) {}

  onChangeSegment(selectedSegment: string) {
    if (selectedSegment === 'words' && !this.hasLoadWords) {
      this.isLoading = true;
      this.hasLoadWords = true;
      this.wordTranslationService
        .getAllWordTranslationWithPhrasesByDeck(this.selectedDeck.id)
        .subscribe({
          next: (wordTranslationsWithPhrases) => {
            this.wordTranslationsWithPhrases = wordTranslationsWithPhrases;
            this.isLoading = false;
          },
          error: (err) => {
            this.toastService.showDangerToast(err.message);
            this.isLoading = false;
          },
        });
    }
    if (selectedSegment === 'phrases' && !this.hasLoadPhrases) {
      this.isLoading = true;
      this.hasLoadPhrases = true;
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
  }
}
