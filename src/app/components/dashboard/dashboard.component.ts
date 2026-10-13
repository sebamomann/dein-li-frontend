import moment from 'moment';
import * as validUrl from 'valid-url';

import {Component, ElementRef, OnInit, ViewChild, ChangeDetectionStrategy} from '@angular/core';
import {Observable} from 'rxjs';
import {ILinkStats} from '../../models/ILinkStats.model';
import {LinkService} from '../../services/link.service';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {animate, query, style, transition, trigger} from '@angular/animations';
import {ShareObject} from '../../models/ShareObejct';
import {ToolbarService} from '../../services/toolbar.service';
import {BasicCallChartComponent} from '../charts/basic-call-chart/basic-call-chart.component';
import {UrlUtil} from '../../_util/Url.util';
import {ChartFilter} from '../../models/ChartFilter/ChartFilter';
import {ILink} from '../../models/ILink.model';
import { HttpErrorResponse } from '@angular/common/http';
import {AuthenticationService} from '../../services/authentication.service';
import {ActivatedRoute} from '@angular/router';

moment.locale('de');

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [
        // A created link lights up: the point overshoots once, the label writes in after it
        trigger('lightUp', [
            transition('* => *', [
                query('.star-point', [
                    style({ transform: 'scale(0)' }),
                    animate('400ms cubic-bezier(.34, 1.4, .64, 1)', style({ transform: 'scale(1)' })),
                ], { optional: true }),
                query('.label', [
                    style({ opacity: 0, transform: 'translateX(-8px)' }),
                    animate('400ms cubic-bezier(.16, 1, .3, 1)', style({ opacity: 1, transform: 'none' })),
                ], { optional: true }),
            ]),
        ]),
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class DashboardComponent implements OnInit {
  public totalStats$: Observable<ILinkStats>;

  public chart;
  public chartFilter: ChartFilter;

  public event: UntypedFormGroup;
  public userIsLoggedIn = this.authenticationService.userIsLoggedIn();
  public baseUrl = UrlUtil.getBaseUrl();

  public highlightHint = false;
  public creating = false;

  // Links created in this browser, newest first (kept in localStorage, never sent anywhere)
  public created: ILink[] = [];

  // Fixed spots in the lower part of the sky panel where earlier links settle as faint stars
  private static readonly SPOTS = [{x: 12, y: 58}, {x: 34, y: 82}, {x: 58, y: 50}, {x: 82, y: 74}];
  private static readonly STORAGE_KEY = 'dein-li.created';
  @ViewChild('chartRef', {static: true})
  public chartRef: BasicCallChartComponent;
  @ViewChild('create', {static: true}) create: ElementRef;
  private scrollToCreate = false;

  /**
   *
   */
  constructor(public linkService: LinkService, private formBuilder: UntypedFormBuilder,
              private authenticationService: AuthenticationService,
              private toolbarService: ToolbarService, private route: ActivatedRoute) {
    this.toolbarService.setTitle('Home');

    this.route.fragment.subscribe((fragment: string) => {
      if (fragment === 'create') {
        this.scrollToCreate = true;
      }
    });

    this.chartFilter = new ChartFilter();
  }

  /**
   *
   */
  public get earlier(): ILink[] {
    return this.created.slice(1, 1 + DashboardComponent.SPOTS.length);
  }

  public fieldSpots(): { x: number, y: number, link?: ILink }[] {
    const earlier = this.earlier;
    const count = earlier.length || 3;
    return DashboardComponent.SPOTS.slice(0, count).map((spot, i) => ({...spot, link: earlier[i]}));
  }

  public fieldLine(): string {
    return this.fieldSpots().map((spot) => `${spot.x},${spot.y}`).join(' ');
  }

  public ngOnInit() {
    this.created = this.readCreated();

    this.event = this.formBuilder.group({
      link: new UntypedFormControl('', [Validators.required]),
      short: new UntypedFormControl({value: '', disabled: !this.userIsLoggedIn}, [Validators.minLength(3)]),
    });

    this.totalStats$ = this.linkService.loadGlobalLinkStatistics(this.chartFilter);

    if (this.scrollToCreate) {
      setTimeout(() => {
        this.create.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start'});
      }, 250);
    }
  }

  /**
   * Create a link based on the set values inside the form.<br/>
   * Validate values. If correct, send API request.<br/>
   * Distributes API responses to corresponding handlers.
   */
  public saveFnc(formDirective: FormGroupDirective): void {
    const link = this.get('link').value;
    const short = this.get('short').value;

    if (!validUrl.isUri(link)) {
      this.get('link').setErrors({invalid: true});
      return;
    }

    if (!this.event.valid || this.creating) {
      return;
    }

    this.creating = true;
    const creation$$ = this.linkService
      .create(link, short)
      .subscribe(
        (sResponse) => {
          this.creating = false;
          this.handleCreationSuccess({original: link, short: sResponse.short} as ILink, formDirective);
        },
        (err) => {
          this.creating = false;
          this.handleCreationError(err);
        },
        () => {
          creation$$.unsubscribe();
        }
      );
  }

  /**
   * Activated if user tried to set custom short link.<br/>
   * If user is not logged in, he can not set a custom short link.<br/>
   * If user is not logged in, highlight explanation
   */
  public clickedShortInputField() {
    this.highlightHint = false;

    this.highlightHint = this.userIsLoggedIn === false;
  }

  /**
   * Get form element based on name
   *
   * @param name string   Form element name
   */
  public get(name: string) {
    return this.event.get(name);
  }

  /**
   * Get error message forh link input field
   */
  public getLinkErrorMessage(): string {
    if (this.get('link').hasError('invalid')) {
      return 'Das sieht nicht nach einer Web-Adresse aus (https://…)';
    } else if (this.get('link').hasError('required')) {
      return 'Füge eine Adresse ein';
    }
  }

  /**
   * Get error message for custom short link input field
   */
  public getShortErrorMessage(): string {
    if (this.get('short').hasError('inUse')) {
      return 'Diesen Namen gibt es schon';
    } else if (this.get('short').hasError('unprocessable')) {
      return 'Nur Buchstaben, Zahlen, - und _';
    } else if (this.get('short').hasError('minlength')) {
      return 'Mindestens 3 Zeichen';
    }
  }

  public domainOf(url: string): string {
    return UrlUtil.domainOf(url);
  }

  public shareObjectFor(link: ILink): ShareObject {
    const share = new ShareObject();
    share.url = UrlUtil.getBaseDomain() + link.short;
    return share;
  }

  private readCreated(): ILink[] {
    try {
      const raw = localStorage.getItem(DashboardComponent.STORAGE_KEY);
      const list = raw ? JSON.parse(raw) : [];
      return Array.isArray(list) ? list.filter((link) => link && link.short && link.original) : [];
    } catch {
      return [];
    }
  }

  private storeCreated(): void {
    try {
      localStorage.setItem(DashboardComponent.STORAGE_KEY,
        JSON.stringify(this.created.map(({short, original}) => ({short, original}))));
    } catch {
      // storage unavailable (private mode): the panel still works for this visit
    }
  }

  public logout() {
    this.authenticationService.logout();
  }

  public login() {
    this.authenticationService.login();
  }

  /**
   * Called on successful link creation.<br/>
   * Show the new link as the lit star in the sky panel.<br/>
   * The panel offers copy, preview and statistics as next steps.<br/>
   * <br/>
   * Also reset the entire form
   *
   * @param sResponse ILink                   Create Link object
   * @param formDirective FormGroupDirective  Needed for properly resetting Validators
   */
  private handleCreationSuccess(sResponse: ILink, formDirective: FormGroupDirective): void {
    this.created = [sResponse, ...this.created.filter((link) => link.short !== sResponse.short)].slice(0, 6);
    this.storeCreated();

    formDirective.resetForm();
    this.event.reset();
  }

  /**
   * Called on failed link creation.<br/>
   * Takes care of highlighting input fields corresponding to the error response.<br/>
   *
   * @param response HttpErrorResponse    Error response from API
   *
   * @return EMPTY Observable<never>      Instruction to end the Observable
   */
  private handleCreationError(response: HttpErrorResponse): void {
    if (response.status === 400) {
      this.event.get('short').setErrors({inUse: true});
    } else if (response.status === 422) {
      response.error.data.forEach((data) => {
        if (data.attribute === 'original') {
          this.event.get('link').setErrors({invalid: true});
        } else if (data.attribute === 'short') {
          this.event.get('short').setErrors({unprocessable: true});
        }
      });
    }
  }
}
