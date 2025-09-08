import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage {
  constructor(private router: Router) {}

  onClickNavigateDeck() {
    this.router.navigate(['tabs/explore/decks']);
  }

  onClickNavigateWords() {
    this.router.navigate(['tabs/explore/words']);
  }

  onClickNavigatePhrases() {
    this.router.navigate(['tabs/explore/phrases']);
  }

  onClickNavigateVerbs() {
    this.router.navigate(['tabs/explore/verbs']);
  }
}
