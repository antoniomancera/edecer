import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExplorePage } from './explore.page';
import { DecksComponent } from './components/decks/decks.component';
import { WordsComponent } from './components/words/words.component';
import { PhrasesComponent } from './components/phrases/phrases.component';
import { VerbsComponent } from './components/verbs/verbs.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExplorePageRoutingModule {}
