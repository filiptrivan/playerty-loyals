import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { environment } from 'src/environments/environment';
import { BusinessModule } from './business/business.module';
import { TranslateLabelsService } from './business/services/translates/merge-labels';
import { ValidatorService } from './business/services/validators/validators';
import { AuthService } from 'src/app/business/services/auth/auth.service';
import { ConfigService } from './business/services/config.service';
import { AppRoutingModule } from './app-routing.module';
import { MessageService } from 'primeng/api';
import { AuthBaseService, ConfigBaseService, CoreModule, LayoutBaseService, SpiderTranslocoModule, TranslateLabelsAbstractService, ValidatorAbstractService } from '@playerty/spider';
import { LayoutService } from './business/services/layout/layout.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    SpiderTranslocoModule.forRoot(),
    NgxSpinnerModule.forRoot({ type: 'ball-clip-rotate-multiple' }),
    BusinessModule,
    CoreModule,
  ],
  providers: [
    MessageService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.googleClientId, 
              {
                scopes: 'email',
                oneTapEnabled: false,
                prompt: 'none',
                // plugin_name: 'the name of the Google OAuth project you created'
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}