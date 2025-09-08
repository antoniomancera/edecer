import { Component, OnInit, signal } from '@angular/core';

import { Home } from '../home/models/home.interface';
import { HomeService } from '../home/services/home.service';
import { ToastService } from '../shared/services/toast.service';
import { MessagingService } from '../shared/services/messaging.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  selectedTab: string = 'home';
  home: Home;
  isPlatformDesktop = signal<boolean>(false);

  constructor(
    private homeService: HomeService,
    private toastService: ToastService,
    private messagingService: MessagingService,
    private platform: Platform,
  ) {}

  ngOnInit(): void {
    this.homeService.getHome().subscribe({
      next: (home) => {
        this.home = home;
        this.messagingService.setHome(home);
      },
      error: (err) => {
        this.toastService.showDangerToast(err.error.message);
      },
    });

    const isPlatformDesktop = this.platform.is('desktop');
    this.isPlatformDesktop.set(isPlatformDesktop);
    this.messagingService.setIsPlatformDesktop(isPlatformDesktop);
  }

  setToggleSelectedTabOutline(event) {
    this.selectedTab = event.tab;
  }
}
