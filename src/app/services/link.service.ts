import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {ILink} from '../models/ILink.model';
import {Observable, of} from 'rxjs';
import {ILinkStats} from '../models/ILinkStats.model';
import {ChartFilter} from '../models/ChartFilter/ChartFilter';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  constructor(private httpClient: HttpClient) {
  }

  public loadLinkByShort(short: string): Observable<ILink> {
    const url = `${environment.API_URL}link/${short}`;

    const res = this.httpClient.get(url, {observe: 'response', reportProgress: true});

    return res.pipe(
      map(response => {
        return response.body as ILink;
      }),
      catchError(() => {
        return of(null);
      })
    );
  }

  public loadLinkVersions(short: string): Observable<ILink[]> {
    const url = `${environment.API_URL}link/${short}/version`;

    const res = this.httpClient.get(url, {observe: 'response', reportProgress: true});

    return res.pipe(
      map(response => {
        return response.body as ILink[];
      }),
      catchError(() => {
        return of(null);
      })
    );
  }

  loadLinkStats(short: string, preview: boolean, chartFilter: ChartFilter) {
    let url;

    if (preview) {
      url = `${environment.API_URL}link/${short}/history/preview`;
    } else {
      url = `${environment.API_URL}link/${short}/history`;
    }

    let interval;

    if (chartFilter.preset === 'custom') {
      interval = chartFilter.customInterval;
    } else {
      interval = chartFilter.presetInterval;
    }


    url = `${url}?interval=${interval.elementInterval}&start=${interval.start}&end=${interval.end}`;

    const res = this.httpClient.get(url, {observe: 'response', reportProgress: true});

    return res.pipe(
      map(response => {
        return response.body as ILinkStats;
      }),
      catchError(() => {
        return of(null);
      })
    );
  }

  createNewVersion(short: string, original: string) {
    const url = `${environment.API_URL}link/${short}/version`;

    const res = this.httpClient.post(url, {original}, {observe: 'response', reportProgress: true});

    return res.pipe(
      map(response => {
        return response.body as ILink;
      }),
      catchError(() => {
        return of(null);
      })
    );
  }

  public loadLinks(orderBy = 'iat', order = 'DESC'): Observable<ILink[]> {
    const url = `${environment.API_URL}link/all?order_by=${orderBy}&order=${order}`;

    const res = this.httpClient.get(url, {observe: 'response', reportProgress: true});

    return res.pipe(
      map(response => {
        return response.body as ILink;
      }),
      catchError(() => {
        return of(null);
      })
    );
  }

  public create(original: string, short: string) {
    const url = `${environment.API_URL}link`;

    console.log(url);

    const res = this.httpClient.post(url, {original, short}, {observe: 'response', reportProgress: true});

    console.log(1);

    return res.pipe(
      map(response => {
        console.log(2);
        return response.body as ILink;
      }),
      catchError((err) => {
        console.log(3);
        throw err;
      })
    );
  }

  public report(short: string) {
    const url = `${environment.API_URL}report`;

    const res = this.httpClient.post(url, {short}, {observe: 'response', reportProgress: true});

    return res.pipe(
      map(response => {
        return response.body as any;
      }),
      catchError((err) => {
        return of(err);
      })
    );
  }
}
