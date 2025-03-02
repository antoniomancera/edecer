import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';

import { LoadingComponent } from './components/loading/loading.component';
import { WeekdayPipe } from './pipes/weekday.pipe';
import { FirstChartUpperPipe } from './pipes/first-chart-upper.pipe';
import { BoldPipe } from './pipes/bold.pipe';
import { TrackProgressTotalPercentageComponent } from './components/track-progress-total-percentage/track-progress-total-percentage.component';

@NgModule({
  declarations: [
    LoadingComponent,
    WeekdayPipe,
    FirstChartUpperPipe,
    TrackProgressTotalPercentageComponent,
  ],
  imports: [CommonModule, TranslocoModule, BoldPipe],
  exports: [
    LoadingComponent,
    WeekdayPipe,
    FirstChartUpperPipe,
    BoldPipe,
    TrackProgressTotalPercentageComponent,
  ],
})
export class SharedModule {}
