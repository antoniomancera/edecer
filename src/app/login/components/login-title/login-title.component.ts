import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-login-title',
  templateUrl: './login-title.component.html',
  styleUrls: ['../../login.page.scss'],
})
export class LoginTitleComponent {
  @Input() title = '';
}
