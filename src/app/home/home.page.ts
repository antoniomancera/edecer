import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

import Chart from 'chart.js/auto';

import { WordTranslation } from '../shared/models/word-translation.model';
import { HomeService } from './services/home.service';
import { Home } from './models/home.interface';
import { ModalAddGoalComponent } from './components/modal-add-goal/modal-add-goal.component';
import { ToastService } from '../shared/services/toast.service';
import { LoadingService } from '../shared/services/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  wordTranslation: WordTranslation;
  home: Home;
  chart: Chart;
  isLoading = true;

  constructor(
    private homeService: HomeService,
    private modalController: ModalController,
    private loadingService: LoadingService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.loadingService.showLoading();
    this.homeService.getHome().subscribe({
      next: (home) => {
        this.home = home;
        this.getStatsCharts(home);
        this.loadingService.dismissLoading();
        this.isLoading = false;
      },
      error: (err) => {
        this.toastService.showDangerToast(err.error.message);
        this.loadingService.dismissLoading();
        this.isLoading = false;
      },
    });
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ModalAddGoalComponent,
      componentProps: {
        goal: this.home.goal,
      },
      cssClass: 'modal-add-goal',
    });
    await modal.present();
  }

  private getStatsCharts(home: Home) {
    let dates: Date[] = [];
    let totalAttempts: number[] = [];
    let successesAccuracy: number[] = [];

    home.weekStats.forEach((stat) => {
      dates.push(stat.date);
      totalAttempts.push(stat.totalAttempts);
      successesAccuracy.push(
        (stat.totalSuccesses * Math.max(...totalAttempts)) / stat.totalAttempts
      );
    });
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'Total',
            data: totalAttempts,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
          {
            label: 'porcentaje',
            type: 'line',
            data: successesAccuracy,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
          },
        ],
      },
      options: {
        scales: {},
      },
    });
  }
}
