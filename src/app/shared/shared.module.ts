import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';

import { LoadingComponent } from './components/loading/loading.component';
import { WeekdayPipe } from './pipes/weekday.pipe';
import { FirstChartUpperPipe } from './pipes/first-chart-upper.pipe';

@NgModule({
  declarations: [LoadingComponent, WeekdayPipe, FirstChartUpperPipe],
  imports: [CommonModule, TranslocoModule],
  exports: [LoadingComponent, WeekdayPipe, FirstChartUpperPipe],
})
export class SharedModule {}
