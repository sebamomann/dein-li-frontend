import { PageNotFoundModule } from './components/page-not-found/page-not-found.module';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';
import { AuthInterceptor } from './_helper/interceptor/authentication.interceptor';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { MatButtonModule } from '@angular/material/button';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { WINDOW_PROVIDERS } from './provider/window.provider';
import { ImpressumComponent } from './components/impressum/impressum.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { UpdateService } from './services/update.service';
import { AuthConfigModule } from './auth-config/auth-config.module';
import { AccountToolbarModule } from './components/account/account-toolbar/account-toolbar.module';
import { ReportBlockModule } from './components/link/report-block/report-block.module';

registerLocaleData(localeDe);

@NgModule({ declarations: [
        AppComponent,
        ImpressumComponent,
    ],
    exports: [],
    bootstrap: [
        AppComponent
    ], imports: [BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        MatSnackBarModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: true, registrationStrategy: 'registerImmediately' }),
        AuthConfigModule,
        AccountToolbarModule,
        ReportBlockModule,
        PageNotFoundModule], providers: [
        WINDOW_PROVIDERS,
        {
            multi: true,
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
        },
        { provide: LOCALE_ID, useValue: 'de-DE' },
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline', subscriptSizing: 'dynamic' } },
        UpdateService,
        provideHttpClient(withXhr(), withInterceptorsFromDi()),
    ] })
export class AppModule {
  constructor() {
  }
}
