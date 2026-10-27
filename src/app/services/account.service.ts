import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { IAccount } from '../models/IAccount.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private _me$ = new BehaviorSubject<IAccount>(null);

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Account of the logged in user, null until loaded
   */
  public get me$(): BehaviorSubject<IAccount> {
    return this._me$;
  }

  public loadMe(): Observable<IAccount> {
    const url = `${environment.API_URL}accounts/me`;

    return this.httpClient.get<IAccount>(url).pipe(
      tap(account => this._me$.next(account)),
      catchError(() => of(null))
    );
  }

  public updateMe(directForAll: boolean): Observable<IAccount> {
    const url = `${environment.API_URL}accounts/me`;

    return this.httpClient.put<IAccount>(url, { directForAll }).pipe(
      tap(account => this._me$.next(account))
    );
  }

  public loadAll(): Observable<IAccount[]> {
    const url = `${environment.API_URL}accounts`;

    return this.httpClient.get<IAccount[]>(url).pipe(
      catchError(() => of(null))
    );
  }

  public setTrusted(id: string, trusted: boolean): Observable<IAccount> {
    const url = `${environment.API_URL}accounts/${encodeURIComponent(id)}/trusted`;

    return this.httpClient.put<IAccount>(url, { trusted });
  }
}
