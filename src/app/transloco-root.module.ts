import { NgModule } from '@angular/core';

import { provideTransloco, TranslocoModule } from '@jsverse/transloco';

import { TranslocoHttpLoader } from './transloco-loader';
import { environment } from 'src/environments/environment';

@NgModule({
  exports: [TranslocoModule],
  providers: [
    provideTransloco({
      config: {
        availableLangs: ['es', 'en', 'fr'],
        defaultLang: 'es',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: environment.production,
      },
      loader: TranslocoHttpLoader,
    }),
  ],
})
export class TranslocoRootModule {}
