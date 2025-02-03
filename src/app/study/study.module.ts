import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudyPageRoutingModule } from './study-routing.module';

import { StudyPage } from './study.page';
import { SharedModule } from '../shared/shared.module';
import { TranslocoModule } from '@jsverse/transloco';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudyPageRoutingModule,
    SharedModule,
    TranslocoModule,
  ],
  declarations: [StudyPage],
})
export class StudyPageModule {}
