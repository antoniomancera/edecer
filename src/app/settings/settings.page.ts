import { Component, OnInit } from '@angular/core';

import { TranslocoService } from '@jsverse/transloco';

import { LANGUAGES_SUPPORTED } from '../shared/constants/app.constants';
import { UserInfo } from '../home/models/user-info.interface';
import { MessagingService } from '../shared/services/messaging.service';
import { applyTheme } from '../shared/utils/apply-theme.util';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  isDarkMode: boolean = false;
  customActionSheetOptions = {
    header: '',
  };
  languages = LANGUAGES_SUPPORTED;
  selectedLanguage = '';
  userInfo: UserInfo = null;

  constructor(
    private translocoService: TranslocoService,
    private messagingService: MessagingService
  ) {}
  ngOnInit() {
    this.messagingService.getIsDarkMode().subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });

    this.messagingService
      .getSelectedLanguage()
      .subscribe((selectedLanguage) => {
        this.selectedLanguage = selectedLanguage;
      });

    this.messagingService.getHome().subscribe((home) => {
      if (home) this.userInfo = home.userInfo;
    });

    this.translocoService
      .selectTranslate('menu.select-language')
      .subscribe((translation) => {
        this.customActionSheetOptions.header = translation;
      });
  }

  onToggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    applyTheme(this.isDarkMode);
    localStorage.setItem('isDarkMode', JSON.stringify(this.isDarkMode));
  }

  onChangeLanguage(language) {
    this.translocoService.setActiveLang(language);
    localStorage.setItem('language', language);
  }
}
