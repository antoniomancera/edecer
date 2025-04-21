import { Component, OnInit } from '@angular/core';

import { TranslocoService } from '@jsverse/transloco';

import { MessagingService } from './shared/services/messaging.service';
import { LANGUAGE_DEFAULT } from './shared/constants/app.constants';
import { applyTheme } from './shared/utils/apply-theme.util';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  isDarkMode: boolean = false;

  constructor(
    private messagingService: MessagingService,
    private translocoService: TranslocoService
  ) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.isDarkMode = prefersDark.matches;
    applyTheme(this.isDarkMode);
  }
  ngOnInit(): void {
    const storedIsDarkModeTheme = localStorage.getItem('isDarkMode');
    const storedLanguage = localStorage.getItem('language');
    if (storedIsDarkModeTheme) {
      this.isDarkMode = JSON.parse(storedIsDarkModeTheme);
      this.messagingService.setIsDarkMode(JSON.parse(storedIsDarkModeTheme));
      applyTheme(this.isDarkMode);
    }

    if (storedLanguage) {
      this.messagingService.setSelectedLanguage(storedLanguage);
      this.translocoService.setActiveLang(storedLanguage);
    } else {
      this.messagingService.setSelectedLanguage(LANGUAGE_DEFAULT.code);
    }
  }
}
