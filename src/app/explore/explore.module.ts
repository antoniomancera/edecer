import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TranslocoModule } from '@jsverse/transloco';

import { ExplorePageRoutingModule } from './explore-routing.module';
import { ExplorePage } from './explore.page';
import { SharedModule } from '../shared/shared.module';
import { DecksComponent } from './components/decks/decks.component';
import { EditDeckModalComponent } from './components/edit-deck-modal/edit-deck-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExplorePageRoutingModule,
    TranslocoModule,
    SharedModule,
  ],
  declarations: [ExplorePage, DecksComponent, EditDeckModalComponent],
})
export class ExplorePageModule {}
