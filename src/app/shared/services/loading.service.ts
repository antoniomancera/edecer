import { Injectable } from '@angular/core';

import { LoadingController } from '@ionic/angular';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  isLoading = false;
  loading: HTMLIonLoadingElement = null;

  constructor(
    public loadingController: LoadingController,
    private translate: TranslocoService
  ) {}

  async showLoading() {
    this.isLoading = true;
    return await this.loadingController.create().then((loading) => {
      loading.present().then(() => {
        if (!this.isLoading) {
          loading.dismiss();
        }
      });
    });
  }

  async dismissLoading() {
    this.isLoading = false;

    return await this.loadingController.dismiss();
  }
}
