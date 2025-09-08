import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ModalController } from '@ionic/angular';

import { WordTranslation } from '../shared/models/word-translation.model';
import { Home } from './models/home.interface';
import { ModalAddGoalComponent } from './components/modal-add-goal/modal-add-goal.component';
import { MessagingService } from '../shared/services/messaging.service';
import { StudyJournalModalComponent } from './components/study-journal-modal/study-journal-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  isHomePage: boolean = true;
  isDarkMode: boolean = false;
  wordTranslation: WordTranslation;
  home: Home;
  isLoading = true;

  constructor(
    private modalController: ModalController,
    private messagingService: MessagingService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.messagingService.getHome().subscribe((home) => {
      this.home = home;
      if (this.home && this.home.weekStats && this.home.goal) {
        this.home.weekStats.map((dailyStats) => {
          const date: Date = new Date(dailyStats.date);
          dailyStats.monthDay = date.getDate();
          dailyStats.weekDay = date.getDay();
          dailyStats.isAttemptsGoalSuccess =
            dailyStats.totalAttempts >= home.goal.attempts;
          dailyStats.isSuccessesAccuracyGoalSuccess =
            dailyStats.totalSuccesses / dailyStats.totalAttempts >
            home.goal.successesAccuracy;

          return dailyStats;
        });
      }
      this.isLoading = false;
    });
  }

  async openAddGoalModal() {
    const modal = await this.modalController.create({
      component: ModalAddGoalComponent,
      componentProps: {
        goal: this.home.goal,
      },
    });
    await modal.present();
  }

  async openStudyJournalModal(date) {
    const modal = await this.modalController.create({
      component: StudyJournalModalComponent,
      componentProps: {
        date: date,
        decks: this.home.decks,
        goal: this.home.goal,
        stat: this.home.weekStats.find((stat) => {
          let statDate =
            typeof stat.date === 'string' ? new Date(stat.date) : stat.date;
          let today = new Date();
          today.setHours(0, 0, 0, 0);
          statDate.setHours(0, 0, 0, 0);

          return statDate.getTime() === today.getTime();
        }),
      },
    });
    await modal.present();
  }

  onClickNavigateDeck(deckId: number) {
    this.router.navigate(['tabs/explore/decks'], {
      queryParams: { deckId: deckId },
    });
  }

  onClickNavigateStudy() {
    this.router.navigate(['tabs/study']);
  }
}
