import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {finalize, map} from 'rxjs/operators';

import {environment} from '../../environments/environment';
import {IUser} from '../models/IUser.model';
import {Router, RouterStateSnapshot} from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  public currentUser: Observable<any>;
  private currentUserSubject$: BehaviorSubject<any>;

  constructor(private _http: HttpClient, private _router: Router) {
    this.currentUserSubject$ = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject$.asObservable();

    this.currentUserSubject$
      .subscribe(() => {
        this._loginStatus$.next(this.userIsLoggedIn());
      });
  }

  private _refreshing$ = new BehaviorSubject<boolean>(false);

  get refreshing$(): Observable<boolean> {
    return this._refreshing$;
  }

  set refreshing(value: boolean) {
    this._refreshing$.next(value);
  }

  private _loginStatus$ = new BehaviorSubject(false);

  public get loginStatus$() {
    return this._loginStatus$;
  }

  public get currentUserValue() {
    return this.currentUserSubject$.value;
  }

  public get accessToken() {
    return this.currentUserValue.token;
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject$.next(null);
  }

  setCurrentUser(user: IUser) {
    this.currentUserSubject$.next(user);
    localStorage.setItem('currentUser', JSON.stringify(this.currentUserValue));
  }

  check(state: RouterStateSnapshot): boolean {
    if (this.userIsLoggedIn()) {
      return true;
    } else {
      // not logged in so redirect to login page with the return url
      this._router.navigate(['/account/login'], {
        queryParams: {
          returnUrl: state.url,
        }
      })
        .then(() => {
          return false;
        });

      return false;
    }
  }

  isExpired() {
    if (this.currentUserValue && (new Date(this.currentUserValue.exp).getTime()) < (new Date().getTime())) {
      this.logout();
      return true;
    }

    return false;
  }

  login(mail, password) {
    return this._http.post<any>(`${environment.API_URL}auth/login`, {username: mail, password})
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        // tslint:disable-next-line:prefer-const
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject$.next(user);

        return user;
      }));
  }

  public getRefreshToken() {
    if (this.currentUserValue !== null) {
      return this.currentUserValue.refreshToken;
    }

    return '';
  }

  public refreshAccessToken() {
    this.refreshing = true;
    return this._http
      .post<any>(`${environment.API_URL}auth/token`, {
        user: {
          id: this.currentUserValue.id,
        },
        refreshToken: this.getRefreshToken(),
      })
      .pipe(
        map((res) => {
          this.setAccessToken(res.data.token);
        }),
        finalize(() => {
          this.refreshing = false;
        })
      );
  }

  public userIsLoggedIn() {
    return this.currentUserValue !== null;
  }

  private setAccessToken(token: any) {
    const currentUser = this.currentUserValue;
    currentUser.token = token;

    this.setCurrentUser(currentUser);
  }
}
