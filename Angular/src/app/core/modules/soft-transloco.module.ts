import { provideTransloco, provideTranslocoLoader, TranslocoModule } from '@jsverse/transloco';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { SoftTranslocoLoader } from '../services/transloco-loader';
import { environment } from 'src/environments/environment';

@NgModule({
  imports: [TranslocoModule],
  exports: [TranslocoModule],
})
export class SoftTranslocoModule {
  static forRoot(): ModuleWithProviders<SoftTranslocoModule> {
    return {
      ngModule: SoftTranslocoModule,
      providers: [
          provideTranslocoLoader(SoftTranslocoLoader),
          provideTransloco({
            config: {
              availableLangs: [
                'sr-Latn-RS', 'sr-Latn-RS.generated', 
                'en', 'en.generated',
              ],
              defaultLang: 'sr-Latn-RS',
              fallbackLang: [
                'sr-Latn-RS.generated',
              ],
              missingHandler: {
                useFallbackTranslation: true,
                logMissingKey: false,
              },
              reRenderOnLangChange: true,
              prodMode: environment.production,
            },
          }),
        ],
      };
    }
}