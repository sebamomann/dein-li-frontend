import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthenticationValuesService {

  constructor() {
  }

  private _currentUserSubject$ = new BehaviorSubject<any>(false);

  get currentUserSubject$(): BehaviorSubject<any> {
    return this._currentUserSubject$;
  }

  set currentUserSubject$(value: BehaviorSubject<any>) {
    this._currentUserSubject$ = value;
  }

  private _refreshingSubject$ = new BehaviorSubject<boolean>(false);

  get refreshingSubject$(): BehaviorSubject<boolean> {
    return this._refreshingSubject$;
  }

  set refreshing(value: boolean) {
    this._refreshingSubject$.next(value);
  }

  private _loginStatus$ = new BehaviorSubject<boolean>(null);

  public get loginStatus$(): BehaviorSubject<boolean> {
    return this._loginStatus$;
  }

  public set loginStatus(value: boolean) {
    this._loginStatus$.next(value);
  }
}
