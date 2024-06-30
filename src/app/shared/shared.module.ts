import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizCardComponent } from './components/quiz-card/quiz-card.component';

@NgModule({
  declarations: [QuizCardComponent],
  imports: [CommonModule],
  exports: [QuizCardComponent],
})
export class SharedModule {}
