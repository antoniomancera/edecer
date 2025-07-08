import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { TranslocoModule } from '@jsverse/transloco';

import { LoadingComponent } from './components/loading/loading.component';
import { WeekdayPipe } from './pipes/weekday.pipe';
import { FirstChartUpperPipe } from './pipes/first-chart-upper.pipe';
import { BoldPipe } from './pipes/bold.pipe';
import { TrackProgressTotalPercentageComponent } from './components/track-progress-total-percentage/track-progress-total-percentage.component';
import { ConjugationTensePronounPipe } from './pipes/conjugation-tense-pronoun.pipe';

@NgModule({
  declarations: [
    LoadingComponent,
    WeekdayPipe,
    FirstChartUpperPipe,
    TrackProgressTotalPercentageComponent,
    ConjugationTensePronounPipe,
  ],
  imports: [CommonModule, TranslocoModule, BoldPipe, IonicModule],
  exports: [
    LoadingComponent,
    WeekdayPipe,
    FirstChartUpperPipe,
    BoldPipe,
    TrackProgressTotalPercentageComponent,
    ConjugationTensePronounPipe,
  ],
})
export class SharedModule {}
