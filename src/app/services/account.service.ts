import {Inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IUser} from '../models/IUser.model';
import {IUserRegister} from '../models/IUserRegister.model';
import {WINDOW} from '../provider/window.provider';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient: HttpClient, @Inject(WINDOW) private window: Window) {
  }

  public get(): Observable<HttpEvent<IUser>> {
    const url = `${environment.API_URL}user`;
    const req = new HttpRequest('GET', url, {
      reportProgress: true,
    });
    return this.httpClient.request(req);
  }

  public register(userData: IUserRegister) {
    const url = `${environment.API_URL}user`;
    const body = {
      ...userData,
    };

    return this.httpClient
      .post<IUser>(url, body, {
          observe: 'response',
          reportProgress: true
        }
      );
  }

  public activate(mail: string, token: string) {
    const url = `${environment.API_URL}user/verify/${window.btoa(mail)}/${token}`;
    return this.httpClient.get<null>(url, {observe: 'response', reportProgress: true});
  }
}
