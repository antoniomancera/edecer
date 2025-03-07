import { Component, Input } from '@angular/core';
import { Goal } from 'src/app/home/models/goal.interface';

import { DailyStats } from 'src/app/stats/models/daily-stats.interface';

@Component({
  selector: 'app-track-progress-total-percentage',
  templateUrl: './track-progress-total-percentage.component.html',
  styleUrls: ['./track-progress-total-percentage.component.scss'],
})
export class TrackProgressTotalPercentageComponent {
  @Input() stat: DailyStats;
  @Input() goal: Goal;
}
