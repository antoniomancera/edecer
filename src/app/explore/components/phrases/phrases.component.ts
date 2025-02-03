import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Phrase } from 'src/app/shared/models/phrase.interface';
import { PhraseService } from 'src/app/shared/services/phrase.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-phrases',
  templateUrl: './phrases.component.html',
  styleUrls: ['./phrases.component.scss'],
})
export class PhrasesComponent implements OnInit {
  pageNumber = 1;
  pageSize = 10;
  isLoading = false;
  phrases: Phrase[] = [];

  constructor(
    private phraseService: PhraseService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.getAllPhrases();
  }

  onIonInfiniteGetNextPagePhrases(event: InfiniteScrollCustomEvent) {
    this.pageNumber += 1;
    this.isLoading = true;
    this.getAllPhrases(event);
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
