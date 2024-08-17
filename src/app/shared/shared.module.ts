import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizCardComponent } from './components/quiz-card/quiz-card.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [QuizCardComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [QuizCardComponent],
})
export class SharedModule {}
