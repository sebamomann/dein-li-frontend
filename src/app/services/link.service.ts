import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, retry } from 'rxjs/operators';
import { ILink } from '../models/ILink.model';
import { Observable, of, throwError, timer } from 'rxjs';
import { ChartFilter } from '../models/ChartFilter/ChartFilter';
import { ILinkStats } from '../models/ILinkStats.model';
import { Interval } from '../models/Interval/Interval.class';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Load a link by its short. Network errors and 5xx are retried twice, because a single failed
   * request (e.g. while the service worker updates) must not look like a missing link.
   * Errors are passed on, so callers can tell a 404 from a failed request.
   */
  public fetchLinkByShort(short: string): Observable<ILink> {
    const url = `${environment.API_URL}links/${short}`;

    return this.httpClient.get<ILink>(url).pipe(
      retry({
        count: 2,
        delay: (err, attempt) => LinkService.isTransient(err) ? timer(500 * attempt) : throwError(() => err),
      }),
    );
  }

  public loadLinkByShort(short: string): Observable<ILink> {
    return this.fetchLinkByShort(short).pipe(
      catchError(() => {
        return of(null);
      })
    );
  }

  /**
   * Network error (status 0) or server error - worth another try, unlike a 404
   */
  private static isTransient(err: any): boolean {
    return err instanceof HttpErrorResponse && (err.status === 0 || err.status >= 500);
  }

  public loadLinkVersions(short: string): Observable<ILink[]> {
    const url = `${environment.API_URL}links/${short}/versions`;

    const res = this.httpClient.get(url, { observe: 'response', reportProgress: true });

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

    const res = this.httpClient.get(url, { observe: 'response', reportProgress: true });

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

    const res = this.httpClient.get(url, { observe: 'response', reportProgress: true });

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

    const res = this.httpClient.put(url, { original }, { observe: 'response', reportProgress: true });

    return res.pipe(
      map(response => {
        return response.body as ILink;
      }),
      catchError(() => {
        return of(null);
      })
    );
  }

  public setDirect(short: string, direct: boolean): Observable<ILink> {
    const url = `${environment.API_URL}links/${short}/direct`;

    return this.httpClient.put<ILink>(url, { direct });
  }

  public loadLinks(orderBy = 'iat', order = 'DESC', limit = 15, offset = 0): Observable<ILink[]> {
    const url = `${environment.API_URL}links?order_by=${orderBy}&order=${order}&limit=${limit}&offset=${offset}`;

    const res = this.httpClient.get(url, { observe: 'response', reportProgress: true });

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

    const res = this.httpClient.post(url, { original, short }, { observe: 'response', reportProgress: true });

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

    const res = this.httpClient.post(url, { short }, { observe: 'response', reportProgress: true });

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
