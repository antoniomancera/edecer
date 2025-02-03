import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

import { WordTranslation } from 'src/app/shared/models/word-translation.model';
import { ToastService } from 'src/app/shared/services/toast.service';
import { WordTranslationService } from 'src/app/shared/services/word-translation.service';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.scss'],
})
export class WordsComponent implements OnInit {
  pageNumber = 1;
  pageSize = 10;
  isLoading = false;
  wordsTranslation: WordTranslation[] = [];

  constructor(
    private wordsService: WordTranslationService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.getAllWordTranslations();
  }

  onIonInfiniteGetNextPageWordsTranslation(event: InfiniteScrollCustomEvent) {
    this.pageNumber += 1;
    this.isLoading = true;
    this.getAllWordTranslations(event);
  }

  private getAllWordTranslations(event?: InfiniteScrollCustomEvent) {
    this.wordsService
      .getAllWordTranslations(this.pageNumber, this.pageSize)
      .subscribe({
        next: (wordsTranslation) => {
          this.wordsTranslation = wordsTranslation;
          if (event) event.target.complete();
          this.isLoading = false;
        },
        error: (err) => {
          this.toastService.showDangerToast(err.message);
          if (event) event.target.complete();
          this.isLoading = false;
        },
      });
  }
}
