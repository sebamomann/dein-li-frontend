import { PageNotFoundModule } from './components/page-not-found/page-not-found.module';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './_helper/interceptor/authentication.interceptor';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { WINDOW_PROVIDERS } from './provider/window.provider';
import { ImpressumComponent } from './components/impressum/impressum.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { UpdateService } from './services/update.service';
import { AuthConfigModule } from './auth-config/auth-config.module';
import { AccountToolbarModule } from './components/account/account-toolbar/account-toolbar.module';

registerLocaleData(localeDe);

@NgModule({
  declarations: [
    AppComponent,
    ImpressumComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatSnackBarModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: true, registrationStrategy: 'registerImmediately' }),
    AuthConfigModule,
    AccountToolbarModule,
    PageNotFoundModule,
  ],
  providers: [
    WINDOW_PROVIDERS,
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
    },
    { provide: LOCALE_ID, useValue: 'de-DE' },
    UpdateService,
  ],
  exports: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
  constructor() {
  }
}
