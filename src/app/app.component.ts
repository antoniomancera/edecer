import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  selectedTab: string = 'home'; // Inicializa con la pestaña por defecto

  constructor() {}

  setToggleSelectedTabOutline(event) {
    this.selectedTab = event.tab;
  }
}
