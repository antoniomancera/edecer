import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TranslocoModule } from '@jsverse/transloco';

import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ModalAddGoalComponent } from './components/modal-add-goal/modal-add-goal.component';
import { MenuComponent } from './components/menu/menu.component';
import { ContactModalComponent } from './components/contact-modal/contact-modal.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedModule,
    TranslocoModule,
  ],
  declarations: [
    HomePage,
    ModalAddGoalComponent,
    MenuComponent,
    ContactModalComponent,
  ],
})
export class HomePageModule {}
