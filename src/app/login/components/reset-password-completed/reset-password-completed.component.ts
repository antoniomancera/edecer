import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password-completed',
  templateUrl: './reset-password-completed.component.html',
  styleUrls: ['../../login.page.scss'],
})
export class ResetPasswordCompletedComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  onClickGoLogin() {
    this.router.navigate(['login']);
  }
}
