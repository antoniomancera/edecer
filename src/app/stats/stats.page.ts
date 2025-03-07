import { Component, OnInit } from '@angular/core';

import Chart from 'chart.js/auto';

import { StatsService } from './services/stats.service';
import { Stats } from './models/stats.interface';
import { MessagingService } from '../shared/services/messaging.service';
import { Goal } from '../home/models/goal.interface';
import { interpolateColours } from '../shared/utils/interpolate-colours.util';
import { DANGER_COLOR, SUCCESS_COLOR } from '../shared/constants/app.constants';
import { Deck } from '../shared/models/deck.interface';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
})
export class StatsPage implements OnInit {
  chart: Chart;

  isLoading = true;
  stats: Stats;
  segment = 'attempts';
  goal: Goal;
  decks: Deck[] = [];

  dates: Date[] = [];
  totalAttempts: number[] = [];
  totalAttemptsDailyEvolution: number[] = [];
  backgroundColorAttemps: string[] = [];
  successesAccuracy: number[] = [];
  successesAccuracyDailyEvolution: number[] = [];
  backgroundColorSuccessesAccuracy: string[] = [];

  constructor(
    private statsService: StatsService,
    private messagingService: MessagingService
  ) {}

  ngOnInit() {
    this.messagingService.getHome().subscribe((home) => {
      this.goal = home.goal;
      this.decks = home.decks;
    });
    this.statsService.getStatsPageInitial().subscribe((stats) => {
      this.isLoading = false;
      this.dates = stats.map((stat) => stat.date);

      this.totalAttempts = stats.map((stat) => stat.totalAttempts);
      this.totalAttemptsDailyEvolution = this.getDailyEvolutionStat(
        this.totalAttempts
      );
      this.backgroundColorAttemps = this.getBackgroundColor(
        this.totalAttempts,
        this.goal.attempts
      );

      this.successesAccuracy = stats.map((stat) => {
        if (!stat.totalAttempts || stat.totalAttempts === 0) {
          return 0;
        } else
          return (
            (stat.totalSuccesses * Math.max(...this.totalAttempts)) /
            stat.totalAttempts
          );
      });

      this.successesAccuracyDailyEvolution = this.getDailyEvolutionStat(
        this.successesAccuracy
      );

      this.backgroundColorSuccessesAccuracy = this.getBackgroundColor(
        this.successesAccuracy,
        this.goal.successesAccuracy
      );

      this.chart = new Chart('canvas', {
        type: 'bar',
        data: {
          labels: this.dates,
          datasets: [
            {
              label: 'Total',
              data: this.totalAttempts,
              backgroundColor: this.backgroundColorAttemps,
            },
            {
              label: 'porcentaje',
              type: 'line',
              data: this.totalAttemptsDailyEvolution,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
            },
          ],
        },
        options: {
          scales: {},
        },
      });

      // this.getStatsCharts(stats);
    });
  }

  onChangeChangeDataChart() {
    console.log('segment', this.segment);
    if (this.segment === 'attempts') {
      console.log('this.backgroundColorAttemps', this.backgroundColorAttemps);
      this.chart.data = {
        labels: this.dates,
        datasets: [
          {
            label: 'Total',
            data: this.totalAttempts,
            backgroundColor: this.backgroundColorAttemps,
          },
          {
            label: 'porcentaje',
            type: 'line',
            data: this.totalAttemptsDailyEvolution,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
          },
        ],
      };
    } else {
      this.chart.data = {
        labels: this.dates,
        datasets: [
          {
            label: 'Total',
            data: this.successesAccuracy,
            backgroundColor: this.backgroundColorSuccessesAccuracy,
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
            data: this.successesAccuracyDailyEvolution,
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
      };
    }
    this.chart.update();
  }

  private getDailyEvolutionStat(stat: number[]): number[] {
    let dailyEvolution = [];

    if (stat && stat.length > 0) {
      for (let i = 0; i < stat.length; i++) {
        if (i === 0) {
          dailyEvolution.push(stat[i]);
        } else {
          dailyEvolution.push(stat[i] - stat[i - 1]);
        }
      }
    }
    return dailyEvolution;
  }

  private getBackgroundColor(stats: number[], goal: number): string[] {
    let backgroundColors = [];
    stats.map((stat) => {
      backgroundColors.push(
        interpolateColours(DANGER_COLOR, SUCCESS_COLOR, stat / goal)
      );
    });

    return backgroundColors;
  }
}
