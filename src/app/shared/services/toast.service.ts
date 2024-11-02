import { Injectable } from '@angular/core';

import { ToastController } from '@ionic/angular';
import { NotificationType } from '../enums/notification-type.enum';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastCtrl: ToastController) {}

  showSuccessToast(message: string) {
    this.showToast(message, NotificationType.SUCCESS);
  }

  showDangerToast(message: string) {
    this.showToast(message, NotificationType.DANGER);
  }

  private async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      color: color,
      message: message,
      translucent: true,
    });
    toast.present();
  }
}
