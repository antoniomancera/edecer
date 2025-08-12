import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExplorePage } from './explore.page';
import { DecksComponent } from './components/decks/decks.component';
import { WordsComponent } from './components/words/words.component';
import { PhrasesComponent } from './components/phrases/phrases.component';
import { VerbsComponent } from './components/verbs/verbs.component';
import { AddDeckModalComponent } from './components/decks/add-deck-modal/add-deck-modal.component';

const routes: Routes = [
  {
    path: '',
    component: ExplorePage,
  },
  {
    path: 'decks',
    component: DecksComponent,
  },
  {
    path: 'words',
    component: WordsComponent,
  },
  {
    path: 'phrases',
    component: PhrasesComponent,
  },
  {
    path: 'verbs',
    component: VerbsComponent,
  },
  {
    path: 'add-deck',
    component: AddDeckModalComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExplorePageRoutingModule {}
