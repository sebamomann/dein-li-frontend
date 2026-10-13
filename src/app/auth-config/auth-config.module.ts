import {APP_INITIALIZER, NgModule} from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {AuthConfig, OAuthModule} from 'angular-oauth2-oidc';

import {authConfig, OAuthModuleConfig} from './auth.config';
import {AuthConfigService} from '../services/auth-config.service';

export function init_app(authConfigService: AuthConfigService) {
  return () => authConfigService.initAuth();
}

@NgModule({ imports: [OAuthModule.forRoot()], providers: [
        AuthConfigService,
        { provide: AuthConfig, useValue: authConfig },
        OAuthModuleConfig,
        {
            provide: APP_INITIALIZER,
            useFactory: init_app,
            deps: [AuthConfigService],
            multi: true
        },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AuthConfigModule {
}
