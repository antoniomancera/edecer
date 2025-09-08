import { Component, Input, OnChanges, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

import { MessagingService } from 'src/app/shared/services/messaging.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit, OnChanges {
  @Input() isHomePage: boolean = false;
  @Input() isStudyPage: boolean = false;
  @Input() isExplorePage: boolean = false;
  @Input() isProfilePage: boolean = false;
  @Input() isWordsComponent: boolean = false;
  @Input() isPhrasesComponent: boolean = false;
  @Input() isDecksComponent: boolean = false;
  @Input() isVerbsComponent: boolean = false;

  isPlatformDesktop = signal<boolean>(false);
  showExplore = false;
  isExploreActive = false;

  constructor(
    private router: Router,
    private messagingService: MessagingService,
  ) {}

  ngOnChanges() {
    this.isExplorePage =
      this.isWordsComponent ||
      this.isPhrasesComponent ||
      this.isDecksComponent ||
      this.isVerbsComponent;
  }

  ngOnInit() {
    this.messagingService
      .getIsPlatformDesktop()
      .subscribe((isPlatformDesktop) =>
        this.isPlatformDesktop.set(isPlatformDesktop),
      );
  }

  onClickNavigate(route) {
    console.log(route);
    switch (route) {
      case 'home': {
        this.router.navigate(['tabs/home']);
        break;
      }
      case 'study': {
        this.router.navigate(['tabs/study']);
        break;
      }
      case 'decks': {
        this.router.navigate(['tabs/explore/decks']);
        break;
      }
      case 'words': {
        this.router.navigate(['tabs/explore/words']);
        break;
      }
      case 'phrases': {
        this.router.navigate(['tabs/explore/phrases']);
        break;
      }
      case 'verbs': {
        this.router.navigate(['tabs/explore/verbs']);
        break;
      }
      case 'profile': {
        this.router.navigate(['tabs/profile']);
        break;
      }
      default: {
        this.router.navigate(['tabs/home']);
        break;
      }
    }
  }
}
