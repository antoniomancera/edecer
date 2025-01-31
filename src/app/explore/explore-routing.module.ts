import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExplorePage } from './explore.page';
import { DecksComponent } from './components/decks/decks.component';

const routes: Routes = [
  {
    path: '',
    component: ExplorePage,
  },
  {
    path: 'decks',
    component: DecksComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExplorePageRoutingModule {}
