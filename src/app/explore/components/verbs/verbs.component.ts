import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

import { ModalController } from '@ionic/angular';

import { Word } from 'src/app/shared/models/word.interface';
import { WordService } from 'src/app/shared/services/word.service';
import { ConjugationCompleteComponent } from './conjugation-complete/conjugation-complete.component';
import { MessagingService } from 'src/app/shared/services/messaging.service';

@Component({
  selector: 'app-verbs',
  templateUrl: './verbs.component.html',
  styleUrls: ['./verbs.component.scss'],
})
export class VerbsComponent implements OnInit {
  isVerbsComponent = true;
  verbs: Word[] = [];
  isPlatformDesktop = signal<boolean>(false);

  constructor(
    private wordService: WordService,
    private modalController: ModalController,
    private messagingService: MessagingService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.wordService.getAllVerbs().subscribe((verbs) => {
      this.verbs = verbs;
    });

    this.messagingService
      .getIsPlatformDesktop()
      .subscribe((isPlatformDesktop) =>
        this.isPlatformDesktop.set(isPlatformDesktop),
      );
  }

  onClickNavigateExplore() {
    this.router.navigate(['tabs/explore']);
  }

  async onClickOpenEditDeck(verbId: number) {
    const modal = await this.modalController.create({
      component: ConjugationCompleteComponent,
      componentProps: {
        verbId: 99,
      },

      initialBreakpoint: 0.9,
    });
    await modal.present();
  }
}
