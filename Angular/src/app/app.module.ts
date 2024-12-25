import { ErrorHandler, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotfoundComponent } from './core/components/notfound/notfound.component';
import { AppLayoutModule } from './layout/components/layout/app.layout.module';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { CoreModule } from './core/modules/core.module';
import { SoftMessageService } from './core/services/soft-message.service';
import { SoftErrorHandler } from './core/handlers/soft-error-handler';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './business/services/api/api.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { environment } from 'src/environments/environment';
import { TranslocoRootModule } from './transloco-root.module';
import { BusinessModule } from './business/business.module';

@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppLayoutModule,
    MessagesModule,
    ToastModule,
    SocialLoginModule,
    TranslocoRootModule,
    NgxSpinnerModule.forRoot({ type: 'ball-clip-rotate-multiple' }),
    BusinessModule,
    CoreModule,
  ],
  providers: [
    SoftMessageService,
    MessageService,
    {
    provide: ErrorHandler,
    useClass: SoftErrorHandler,
    },
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
    ApiService,
    NgxSpinnerService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}