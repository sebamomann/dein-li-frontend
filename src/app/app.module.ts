import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, LOCALE_ID, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './_helper/interceptor/authentication.interceptor';
import {registerLocaleData} from '@angular/common';
import localeDe from '@angular/common/locales/de';
import {MatButtonModule, MatIconModule, MatMenuModule, MatSnackBarModule, MatToolbarModule} from '@angular/material';
import {WINDOW_PROVIDERS} from './provider/window.provider';
import {ImpressumComponent} from './components/impressum/impressum.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {UpdateService} from './services/update.service';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';

registerLocaleData(localeDe);

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://account.sebamomann.de/auth',
        realm: 'Localhost',
        clientId: 'localhost-test',
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html',
      },
    });
}

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
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: true, registrationStrategy: 'registerImmediately'}),
    KeycloakAngularModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    WINDOW_PROVIDERS,
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
    },
    {provide: LOCALE_ID, useValue: 'de-DE'},
    UpdateService,
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
