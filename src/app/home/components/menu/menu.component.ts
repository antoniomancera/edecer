import { Component, OnInit } from '@angular/core';

import { TranslocoService } from '@jsverse/transloco';

import { LANGUAGES_SUPPORTED } from 'src/app/shared/constants/app.constants';
import { MessagingService } from 'src/app/shared/services/messaging.service';
import { applyTheme } from 'src/app/shared/utils/apply-theme.util';
import { UserInfo } from '../../models/user-info.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
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
        console.log('trans', translation);
        this.customActionSheetOptions.header = translation;
      });
  }

  onToggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    applyTheme(this.isDarkMode);
    localStorage.setItem('isDarkMode', JSON.stringify(this.isDarkMode));
  }

  onChangeLanguage(language) {
    console.log(language);
    this.translocoService.setActiveLang(language);
    localStorage.setItem('language', language);
  }
}
