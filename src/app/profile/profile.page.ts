import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MessagingService } from '../shared/services/messaging.service';
import { UserInfo } from '../home/models/user-info.interface';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  isProfilePage = true;
  userInfo: UserInfo = null;

  constructor(
    private messagingService: MessagingService,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {}

  ngOnInit() {
    this.authenticationService
      .getCurrentUser()
      .subscribe((user) => console.log(user));
    this.messagingService.getHome().subscribe((home) => {
      if (home) this.userInfo = home.userInfo;
    });
  }

  onClickNavigateSettings() {
    this.router.navigate(['tabs/settings']);
  }

  onClickNavigateStats() {
    this.router.navigate(['tabs/stats']);
  }
}
