import {Injectable} from '@angular/core';
import {AuthConfig, NullValidationHandler, OAuthService} from 'angular-oauth2-oidc';
import {filter} from 'rxjs/operators';
import {AuthenticationValuesService} from './authentication.values.service';
import {Router} from '@angular/router';

@Injectable()
export class AuthConfigService {

  constructor(
    private readonly oauthService: OAuthService,
    private readonly authConfig: AuthConfig,
    private authenticationValueService: AuthenticationValuesService,
    private router: Router
  ) {
  }

  private _decodedAccessToken: any;

  get decodedAccessToken() {
    return this._decodedAccessToken;
  }

  private _decodedIDToken: any;

  get decodedIDToken() {
    return this._decodedIDToken;
  }

  async initAuth(reinit: boolean): Promise<any> {
    return new Promise<boolean>((resolveFn, rejectFn) => {
      // setup oauthService
      this.oauthService.configure(this.authConfig);
      this.oauthService.setStorage(localStorage);
      this.oauthService.tokenValidationHandler = new NullValidationHandler();

      // subscribe to token events
      this.oauthService.events
        .pipe(filter((e: any) => {
          return e.type === 'token_received';
        }))
        .subscribe(() => this.handleNewToken(),
          (err) => {
          });

      // continue initializing app or redirect to login-page

      this.oauthService.loadDiscoveryDocument()
        .then(_ => {
          this.oauthService.tryLogin()
            .then((loggedIn) => {
              if (this.oauthService.hasValidAccessToken()) {
                console.log('[KEYCLOAK] - VALID TOKEN');
                this.router.navigate(['/'], {queryParams: {success1: true}});

                this.authenticationValueService.currentUserSubject$.next(this.oauthService.getIdentityClaims());
                this.authenticationValueService.loginStatus$.next(true);
                this.oauthService.setupAutomaticSilentRefresh();

                resolveFn(true);
              } else {
                console.log('[KEYCLOAK] - INVALID TOKEN');
                this.oauthService.silentRefresh()
                  .then((res) => {
                    this.authenticationValueService.currentUserSubject$.next(this.oauthService.getIdentityClaims());
                    this.authenticationValueService.loginStatus$.next(true);
                    this.oauthService.setupAutomaticSilentRefresh();
                  })
                  .catch((err) => {
                    console.log('[KEYCLOAK] - ERROR - LOGOUT');
                    this.oauthService.logOut();
                  });
                resolveFn(true);
              }
            })
            .catch((err) => {
              console.log('[KEYCLOAK] - ERROR (after TRY LOGIN)');
            });
        })
        .catch((err) => {
          console.log('[KEYCLOAK] - ERROR (after LOAD DISCOVERY DOCUMENT)');
        });
    });
  }

  public initLogin(url: string = '/') {
    this.oauthService.initImplicitFlow();
  }

  private handleNewToken() {
    this._decodedAccessToken = this.oauthService.getAccessToken();
    this._decodedIDToken = this.oauthService.getIdToken();
  }
}
