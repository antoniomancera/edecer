import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TranslocoModule } from '@jsverse/transloco';

import { ProfilePageRoutingModule } from './profile-routing.module';
import { ProfilePage } from './profile.page';
import { AboutModalComponent } from './components/about-modal/about-modal.component';
import { ContactModalComponent } from './components/contact-modal/contact-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    TranslocoModule,
    ReactiveFormsModule,
  ],
  declarations: [ProfilePage, AboutModalComponent, ContactModalComponent],
})
export class ProfilePageModule {}
