import { Injectable } from '@angular/core';

import { User } from '@supabase/supabase-js';

import { BehaviorSubject } from 'rxjs';

import { Home } from 'src/app/home/models/home.interface';
import { UserInfoService } from './user-info.service';
import { UserInfo } from 'src/app/home/models/user-info.interface';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  private home = new BehaviorSubject<Home>(null);
  private isDarkMode = new BehaviorSubject<boolean>(null);
  private selectedLanguage = new BehaviorSubject<string>(null);
  private user = new BehaviorSubject<UserInfo>(null);

  constructor(
    private userInfoService: UserInfoService,
    private toastService: ToastService
  ) {}

  getHome() {
    return this.home.asObservable();
  }

  getIsDarkMode() {
    return this.isDarkMode.asObservable();
  }

  getSelectedLanguage() {
    return this.selectedLanguage.asObservable();
  }

  getUser() {
    return this.user.asObservable();
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

  setUser(userSupabase: User) {
    if (userSupabase) {
      this.userInfoService.getUserInfoBySupabaseId(userSupabase.id).subscribe({
        next: (user) => {
          this.user.next(user);
        },
        error: (err) => {
          this.user.next(null);
          this.toastService.showDangerToast(err.error.message);
        },
      });
    } else {
      this.user.next(null);
    }
  }
}
