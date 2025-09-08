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
import { BackEndConstantPipe } from './pipes/back-end-constant.pipe';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    LoadingComponent,
    WeekdayPipe,
    FirstChartUpperPipe,
    TrackProgressTotalPercentageComponent,
    ConjugationTensePronounPipe,
    NavBarComponent,
  ],
  imports: [
    CommonModule,
    TranslocoModule,
    BoldPipe,
    IonicModule,
    BackEndConstantPipe,
  ],
  exports: [
    LoadingComponent,
    WeekdayPipe,
    FirstChartUpperPipe,
    BoldPipe,
    BackEndConstantPipe,
    TrackProgressTotalPercentageComponent,
    ConjugationTensePronounPipe,
    NavBarComponent,
  ],
})
export class SharedModule {}
