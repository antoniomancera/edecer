import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

import { TranslocoService } from '@jsverse/transloco';

import { combineLatest, map } from 'rxjs';

import { LANGUAGES_SUPPORTED } from '../shared/constants/app.constants';
import { UserInfo } from '../home/models/user-info.interface';
import { MessagingService } from '../shared/services/messaging.service';
import { applyTheme } from '../shared/utils/apply-theme.util';
import { AuthenticationService } from '../shared/services/authentication.service';
import { SettingsService } from './service/settings.service';
import { Course } from '../shared/models/course.model';
import { UserInfoService } from '../shared/services/user-info.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  isProfilePage = true;
  isDarkMode: boolean = false;
  customActionSheetOptionsSelectLanguage = {
    header: '',
  };
  customActionSheetOptionsSelectCourse = {
    header: '',
  };
  languages = LANGUAGES_SUPPORTED;
  selectedLanguage = '';
  selectedCourse = '';
  userInfo: UserInfo = null;
  courses: Course[] = [];
  currentCourse: Course;
  isPlatformDesktop = signal<boolean>(false);

  constructor(
    private translocoService: TranslocoService,
    private messagingService: MessagingService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private settingsService: SettingsService,
    private userInfoService: UserInfoService,
  ) {}
  ngOnInit() {
    this.settingsService
      .getSettingsOptions()
      .subscribe((settingsOptions) => (this.courses = settingsOptions.courses));
    this.messagingService.getIsDarkMode().subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });

    combineLatest([
      this.messagingService.getSelectedLanguage(),
      this.messagingService.getHome(),
      this.messagingService.getIsPlatformDesktop(),
    ])
      .pipe(
        map(([selectedLanguage, home, isPlatformDesktop]) => {
          this.selectedLanguage = selectedLanguage;
          if (home) {
            this.userInfo = home.userInfo;
            this.selectedCourse = home.userInfo.currentCourse.code;
          }
          this.isPlatformDesktop.set(isPlatformDesktop);
        }),
      )
      .subscribe();

    combineLatest([
      this.translocoService.selectTranslate('profile.settings.select-language'),
      this.translocoService.selectTranslate('profile.settings.select-course'),
    ])
      .pipe(
        map(([selectLanguage, selectCourse]) => {
          this.customActionSheetOptionsSelectLanguage.header = selectLanguage;
          this.customActionSheetOptionsSelectCourse.header = selectCourse;
        }),
      )
      .subscribe();
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

  onChangeCourse(course) {
    this.userInfoService
      .setCurrentCourse(course)
      .subscribe((userInfo) => this.messagingService.setUserInfoHome(userInfo));
    console.log(course);
  }

  onClickNavigateProfile() {
    this.router.navigate(['tabs/profile']);
  }

  onClickLogOut() {
    this.authenticationService.signOut();
  }
}
