import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

import { InfiniteScrollCustomEvent } from '@ionic/angular';

import { Phrase } from 'src/app/shared/models/phrase.interface';
import { MessagingService } from 'src/app/shared/services/messaging.service';
import { PhraseService } from 'src/app/shared/services/phrase.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-phrases',
  templateUrl: './phrases.component.html',
  styleUrls: ['./phrases.component.scss'],
})
export class PhrasesComponent implements OnInit {
  isPhrasesComponent = true;
  pageNumber = 1;
  pageSize = 10;
  isLoading = false;
  phrases: Phrase[] = [];
  isPlatformDesktop = signal<boolean>(false);

  constructor(
    private phraseService: PhraseService,
    private toastService: ToastService,
    private messagingService: MessagingService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getAllPhrases();
    this.messagingService
      .getIsPlatformDesktop()
      .subscribe((isPlatformDesktop) =>
        this.isPlatformDesktop.set(isPlatformDesktop),
      );
  }

  onIonInfiniteGetNextPagePhrases(event: InfiniteScrollCustomEvent) {
    this.pageNumber += 1;
    this.isLoading = true;
    this.getAllPhrases(event);
  }

  onClickNavigateExplore() {
    this.router.navigate(['tabs/explore']);
  }

  private getAllPhrases(event?: InfiniteScrollCustomEvent) {
    this.phraseService.getAllPhrases(this.pageNumber, this.pageSize).subscribe({
      next: (phrases) => {
        this.phrases = phrases;
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
