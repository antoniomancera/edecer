import { Component, OnInit, ViewChild } from '@angular/core';

import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-about-modal',
  templateUrl: './about-modal.component.html',
  styleUrls: ['./about-modal.component.scss'],
})
export class AboutModalComponent implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  constructor() {}

  ngOnInit() {}

  close() {
    this.modal.dismiss();
  }
}
