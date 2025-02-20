import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TranslocoModule } from '@jsverse/transloco';

import { StudyPageRoutingModule } from './study-routing.module';
import { StudyPage } from './study.page';
import { SharedModule } from '../shared/shared.module';
import { QuizCardComponent } from './quiz-card/quiz-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudyPageRoutingModule,
    SharedModule,
    TranslocoModule,
    ReactiveFormsModule,
  ],
  declarations: [StudyPage, QuizCardComponent],
})
export class StudyPageModule {}
