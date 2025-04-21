import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signup-completed',
  templateUrl: './signup-completed.component.html',
  styleUrls: ['../../login.page.scss'],
})
export class SignupCompletedComponent implements OnInit {
  email = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.email = this.route.snapshot.paramMap.get('email');
  }

  onClickGoLogin() {
    this.router.navigate(['login']);
  }
}
