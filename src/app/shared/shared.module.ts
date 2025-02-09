import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TranslocoModule } from '@jsverse/transloco';

import { QuizCardComponent } from './components/quiz-card/quiz-card.component';
import { LoadingComponent } from './components/loading/loading.component';
import { WeekdayPipe } from './pipes/weekday.pipe';
import { FirstChartUpperPipe } from './pipes/first-chart-upper.pipe';

@NgModule({
  declarations: [
    QuizCardComponent,
    LoadingComponent,
    WeekdayPipe,
    FirstChartUpperPipe,
  ],
  imports: [CommonModule, ReactiveFormsModule, TranslocoModule],
  exports: [
    QuizCardComponent,
    LoadingComponent,
    WeekdayPipe,
    FirstChartUpperPipe,
  ],
})
export class SharedModule {}
