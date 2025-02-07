import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ModalController } from '@ionic/angular';

import { TranslocoService } from '@jsverse/transloco';

import Chart from 'chart.js/auto';

import { WordTranslation } from '../shared/models/word-translation.model';
import { HomeService } from './services/home.service';
import { Home } from './models/home.interface';
import { ModalAddGoalComponent } from './components/modal-add-goal/modal-add-goal.component';
import { ToastService } from '../shared/services/toast.service';
import { MessagingService } from '../shared/services/messaging.service';
import { applyTheme } from '../shared/utils/apply-theme.util';
import { LANGUAGE_DEFAULT } from '../shared/constants/app.constants';
import { StudyJournalModalComponent } from './components/study-journal-modal/study-journal-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  isDarkMode: boolean = false;
  wordTranslation: WordTranslation;
  home: Home;
  chart: Chart;
  isLoading = true;

  constructor(
    private homeService: HomeService,
    private modalController: ModalController,
    private toastService: ToastService,
    private messagingService: MessagingService,
    private translocoService: TranslocoService,
    private router: Router
  ) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.isDarkMode = prefersDark.matches;
    applyTheme(this.isDarkMode);
  }

  ngOnInit() {
    const storedIsDarkModeTheme = localStorage.getItem('isDarkMode');
    const storedLanguage = localStorage.getItem('language');
    if (storedIsDarkModeTheme) {
      console.log('storedIsDarkModeTheme', storedIsDarkModeTheme);
      this.isDarkMode = JSON.parse(storedIsDarkModeTheme);
      this.messagingService.setIsDarkMode(JSON.parse(storedIsDarkModeTheme));
      applyTheme(this.isDarkMode);
    }

    if (storedLanguage) {
      this.messagingService.setSelectedLanguage(storedLanguage);
      this.translocoService.setActiveLang(storedLanguage);
    } else {
      this.messagingService.setSelectedLanguage(LANGUAGE_DEFAULT.code);
    }

    this.homeService.getHome().subscribe({
      next: (home) => {
        console.log(home.weekStats);
        this.home = home;
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

        this.messagingService.setHome(home);
        this.isLoading = false;
      },
      error: (err) => {
        this.toastService.showDangerToast(err.error.message);
        this.isLoading = false;
      },
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
      },
    });
    await modal.present();
  }

  onClickNavigateDeck(deckId: number) {
    this.router.navigate(['/explore/decks'], {
      queryParams: { deckId: deckId },
    });
  }
}
