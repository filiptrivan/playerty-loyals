import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, withInMemoryScrolling, withPreloading, withRouterConfig } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { routes, scrollConfig, routerConfigOptions } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { providePrimeNG } from 'primeng/config';
import { ThemePreset } from 'src/assets/primeng-theme';
import { AuthBaseService, ConfigBaseService, httpLoadingInterceptor, jsonHttpInterceptor, jwtInterceptor, LayoutBaseService, provideSpiderlyCore, provideSpiderlyTransloco, TranslateLabelsAbstractService, unauthorizedInterceptor, ValidatorAbstractService } from 'spiderly';
import { provideSpinnerConfig } from 'ngx-spinner';
import { SocialAuthServiceConfig, GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { environment } from 'src/environments/environment';
import { TranslateLabelsService } from './business/services/translates/merge-labels';
import { ValidatorService } from './business/services/validators/validators';
import { AuthService } from 'src/app/business/services/auth/auth.service';
import { ConfigService } from './business/services/config.service';
import { LayoutService } from './business/services/layout/layout.service';
import { partnerCodeInterceptor } from './business/interceptors/partner-code.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    provideSpiderlyTransloco({
      availableLangs: [
        'sr-Latn-RS', 'sr-Latn-RS.generated',
        'en', 'en.generated',
      ],
      defaultLang: 'sr-Latn-RS',
      fallbackLang: 'sr-Latn-RS.generated',
    }),
    providePrimeNG({
      theme: {
        preset: ThemePreset,
        options: {
          darkModeSelector: '.dark'
        }
      }
    }),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withInMemoryScrolling(scrollConfig),
      withRouterConfig(routerConfigOptions)
    ),
    provideSpinnerConfig({type: 'ball-clip-rotate-multiple'}),
    provideClientHydration(withEventReplay()),
    provideSpiderlyCore(),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.GoogleClientId,
              {
                scopes: 'email',
                oneTapEnabled: false,
                prompt: 'none',
              },
            )
          },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig
    },
    {
      provide: ValidatorAbstractService,
      useClass: ValidatorService,
    },
    {
      provide: TranslateLabelsAbstractService,
      useClass: TranslateLabelsService,
    },
    {
      provide: AuthBaseService,
      useExisting: AuthService
    },
    {
      provide: ConfigBaseService,
      useExisting: ConfigService
    },
    {
      provide: LayoutBaseService,
      useExisting: LayoutService
    },
    provideHttpClient(withInterceptors([
      httpLoadingInterceptor,
      jsonHttpInterceptor,
      jwtInterceptor,
      unauthorizedInterceptor,
      partnerCodeInterceptor,
    ])),
  ]
};