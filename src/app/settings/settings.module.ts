import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TranslocoModule } from '@jsverse/transloco';

import { SettingsPageRoutingModule } from './settings-routing.module';
import { SettingsPage } from './settings.page';
import { AboutModalComponent } from './components/about-modal/about-modal.component';
import { ContactModalComponent } from './components/contact-modal/contact-modal.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    SettingsPageRoutingModule,
    TranslocoModule,
  ],
  declarations: [SettingsPage, AboutModalComponent, ContactModalComponent],
})
export class SettingsPageModule {}
