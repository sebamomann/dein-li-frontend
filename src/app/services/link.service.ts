import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {ILink} from '../models/ILink.model';
import {Observable, of} from 'rxjs';
import {ChartFilter} from '../models/ChartFilter/ChartFilter';
import {ILinkStats} from '../models/ILinkStats.model';
import {Interval} from '../models/Interval/Interval.class';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  constructor(private httpClient: HttpClient) {
  }

  public loadLinkByShort(short: string): Observable<ILink> {
    const url = `${environment.API_URL}links/${short}`;

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
    const url = `${environment.API_URL}links/${short}/versions`;

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

  public loadGlobalLinkStatistics(chartFilter: ChartFilter) {
    let url = `${environment.API_URL}global/links/statistics`;

    let interval: Interval;

    if (chartFilter.preset === 'custom') {
      interval = chartFilter.customInterval;
    } else {
      interval = chartFilter.presetInterval;
    }

    url = `${url}?interval=${interval.timeUnit}&start=${interval.start}&end=${interval.end}`;

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

  public loadLinkStats(short: string, preview: boolean, chartFilter: ChartFilter) {
    let url;

    if (preview) {
      url = `${environment.API_URL}links/${short}/history/preview`;
    } else {
      url = `${environment.API_URL}links/${short}/statistics`;
    }

    let interval: Interval;

    if (chartFilter.preset === 'custom') {
      interval = chartFilter.customInterval;
    } else {
      interval = chartFilter.presetInterval;
    }


    url = `${url}?interval=${interval.timeUnit}&start=${interval.start}&end=${interval.end}`;

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
    const url = `${environment.API_URL}links/${short}`;

    const res = this.httpClient.put(url, {original}, {observe: 'response', reportProgress: true});

    return res.pipe(
      map(response => {
        return response.body as ILink;
      }),
      catchError(() => {
        return of(null);
      })
    );
  }

  public loadLinks(orderBy = 'iat', order = 'DESC', limit = 15, offset = 0): Observable<ILink[]> {
    const url = `${environment.API_URL}links?order_by=${orderBy}&order=${order}&limit=${limit}&offset=${offset}`;

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

  public create(original: string, short: string) {
    const url = `${environment.API_URL}links`;

    const res = this.httpClient.post(url, {original, short}, {observe: 'response', reportProgress: true});

    return res.pipe(
      map(response => {
        return response.body as ILink;
      }),
      catchError((err) => {
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
