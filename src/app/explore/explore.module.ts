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
import { WordsComponent } from './components/words/words.component';
import { PhrasesComponent } from './components/phrases/phrases.component';
import { VerbsComponent } from './components/verbs/verbs.component';
import { ConjugationCompleteComponent } from './components/verbs/conjugation-complete/conjugation-complete.component';
import { ConjugationTenseComponent } from './components/verbs/conjugation-tense/conjugation-tense.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExplorePageRoutingModule,
    TranslocoModule,
    SharedModule,
  ],
  declarations: [
    ExplorePage,
    DecksComponent,
    EditDeckModalComponent,
    WordsComponent,
    PhrasesComponent,
    VerbsComponent,
    ConjugationCompleteComponent,
    ConjugationTenseComponent,
  ],
})
export class ExplorePageModule {}
