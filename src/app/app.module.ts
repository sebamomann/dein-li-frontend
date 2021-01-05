import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './_helper/interceptor/authentication.interceptor';
import {registerLocaleData} from '@angular/common';
import localeDe from '@angular/common/locales/de';
import {MatIconModule, MatToolbarModule} from '@angular/material';
import {WINDOW_PROVIDERS} from './provider/window.provider';

registerLocaleData(localeDe);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule
  ],
  providers: [
    WINDOW_PROVIDERS,
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
    },
    {provide: LOCALE_ID, useValue: 'de-DE'}
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
