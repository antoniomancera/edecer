import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Home } from 'src/app/home/models/home.interface';
import { UserInfo } from 'src/app/home/models/user-info.interface';

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  private home = new BehaviorSubject<Home>(null);
  private isDarkMode = new BehaviorSubject<boolean>(null);
  private selectedLanguage = new BehaviorSubject<string>(null);

  getHome() {
    return this.home.asObservable();
  }

  getIsDarkMode() {
    return this.isDarkMode.asObservable();
  }

  getSelectedLanguage() {
    return this.selectedLanguage.asObservable();
  }

  setHome(home: Home) {
    this.home.next(home);
  }

  setIsDarkMode(isDarkMode: boolean) {
    this.isDarkMode.next(isDarkMode);
  }

  setSelectedLanguage(selectedLanguage: string) {
    this.selectedLanguage.next(selectedLanguage);
  }

  setUserInfoHome(userInfo: UserInfo) {
    let home = this.home.value;
    home.userInfo = userInfo;
    this.setHome(home);
  }
}
