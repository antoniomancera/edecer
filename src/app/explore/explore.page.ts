import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  onClickNavigateDeck(deckId: number) {
    this.router.navigate(['/explore/decks'], {
      queryParams: { deckId: deckId },
    });
  }
}
