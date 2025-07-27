import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { AddDeckModalComponent } from './components/decks/add-deck-modal/add-deck-modal.component';
import { AddWordSenseComponent } from './components/decks/add-deck-modal/components/add-word-sense/add-word-sense.component';
import { AddPhraseComponent } from './components/decks/add-deck-modal/components/add-phrase/add-phrase.component';
import { AddTitleDescriptionComponent } from './components/decks/add-deck-modal/components/add-title-description/add-title-description.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExplorePageRoutingModule,
    TranslocoModule,
    SharedModule,
    ReactiveFormsModule,
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
    AddDeckModalComponent,
    AddWordSenseComponent,
    AddPhraseComponent,
    AddTitleDescriptionComponent,
  ],
})
export class ExplorePageModule {}
