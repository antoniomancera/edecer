import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

import { InfiniteScrollCustomEvent } from '@ionic/angular';

import { WordTranslation } from 'src/app/shared/models/word-translation.model';
import { MessagingService } from 'src/app/shared/services/messaging.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { WordTranslationService } from 'src/app/shared/services/word-translation.service';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.scss'],
})
export class WordsComponent implements OnInit {
  isWordsComponent = true;
  pageNumber = 1;
  pageSize = 10;
  isLoading = false;
  wordsTranslation: WordTranslation[] = [];
  isPlatformDesktop = signal<boolean>(false);

  constructor(
    private wordsService: WordTranslationService,
    private toastService: ToastService,
    private messagingService: MessagingService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getAllWordTranslations();

    this.messagingService
      .getIsPlatformDesktop()
      .subscribe((isPlatformDesktop) =>
        this.isPlatformDesktop.set(isPlatformDesktop),
      );
  }

  onIonInfiniteGetNextPageWordsTranslation(event: InfiniteScrollCustomEvent) {
    this.pageNumber += 1;
    this.isLoading = true;
    this.getAllWordTranslations(event);
  }

  onClickNavigateExplore() {
    this.router.navigate(['tabs/explore']);
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
