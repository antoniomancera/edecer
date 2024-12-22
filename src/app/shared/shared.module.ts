import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TranslocoModule } from '@jsverse/transloco';

import { QuizCardComponent } from './components/quiz-card/quiz-card.component';
import { LoadingComponent } from './components/loading/loading.component';
import { WeekdayPipe } from './pipes/weekday.pipe';

@NgModule({
  declarations: [QuizCardComponent, LoadingComponent, WeekdayPipe],
  imports: [CommonModule, ReactiveFormsModule, TranslocoModule],
  exports: [QuizCardComponent, LoadingComponent, WeekdayPipe],
})
export class SharedModule {}
