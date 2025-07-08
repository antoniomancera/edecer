import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { Word } from 'src/app/shared/models/word.interface';
import { WordService } from 'src/app/shared/services/word.service';
import { ConjugationCompleteComponent } from './conjugation-complete/conjugation-complete.component';

@Component({
  selector: 'app-verbs',
  templateUrl: './verbs.component.html',
  styleUrls: ['./verbs.component.scss'],
})
export class VerbsComponent implements OnInit {
  verbs: Word[] = [];
  constructor(
    private wordService: WordService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.wordService.getAllVerbs().subscribe((verbs) => {
      this.verbs = verbs;
    });
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
