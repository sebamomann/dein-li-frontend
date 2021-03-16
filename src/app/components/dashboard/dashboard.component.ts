import * as moment from 'moment';
import * as validUrl from 'valid-url';

import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {ILinkStats} from '../../models/ILinkStats.model';
import {LinkService} from '../../services/link.service';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {SuccessfulCreationDialogComponent} from '../../dialogs/successful-creation-dialog/successful-creation-dialog.component';
import {ToolbarService} from '../../services/toolbar.service';
import {BasicCallChartComponent} from '../charts/basic-call-chart/basic-call-chart.component';
import {UrlUtil} from '../../_util/Url.util';
import {ChartFilter} from '../../models/ChartFilter/ChartFilter';
import {ILink} from '../../models/ILink.model';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthenticationService} from '../../services/authentication.service';
import {ActivatedRoute} from '@angular/router';

moment.locale('de');

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public totalStats$: Observable<ILinkStats>;

  public chart;
  public chartFilter: ChartFilter;

  public event: FormGroup;
  public userIsLoggedIn = this.authenticationService.userIsLoggedIn();
  public baseUrl = UrlUtil.getBaseUrl();

  public highlightHint = false;
  @ViewChild('chartRef', {static: true})
  public chartRef: BasicCallChartComponent;
  @ViewChild('create', {static: true}) create: ElementRef;
  private scrollToCreate = false;

  /**
   *
   */
  constructor(public linkService: LinkService, private formBuilder: FormBuilder,
              private dialog: MatDialog, private authenticationService: AuthenticationService,
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
  public ngOnInit() {
    this.event = this.formBuilder.group({
      link: new FormControl('', [Validators.required]),
      short: new FormControl({value: '', disabled: !this.userIsLoggedIn}, [Validators.minLength(3)]),
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

    if (!this.event.valid) {
      return;
    }

    const creation$$ = this.linkService
      .create(link, short)
      .subscribe(
        (sResponse) => {
          this.handleCreationSuccess({original: link, short: sResponse.short} as ILink, formDirective);
        },
        (err) => {
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
      return 'Gebe einen gültigen Link ein ';
    } else if (this.get('link').hasError('required')) {
      return 'Bitte gebe einen Link ein';
    }
  }

  /**
   * Get error message for custom short link input field
   */
  public getShortErrorMessage(): string {
    if (this.get('short').hasError('inUse')) {
      return 'Dieser Kurzlink ist bereits vergeben';
    } else if (this.get('short').hasError('unprocessable')) {
      return 'Invalide Zeichen';
    } else if (this.get('short').hasError('minlength')) {
      return 'Der Kurzlink muss mindestens 3 Zeichen lang sein';
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
   * Open {@link SuccessfulCreationDialogComponent}.<br/>
   * Component contains next steps for user to take after link creation.<br/>
   * <br/>
   * Also reset the entire form
   *
   * @param sResponse ILink                   Create Link object
   * @param formDirective FormGroupDirective  Needed for properly resetting Validators
   */
  private handleCreationSuccess(sResponse: ILink, formDirective: FormGroupDirective): void {
    this.dialog.open(SuccessfulCreationDialogComponent, {
      id: 'successful-creation-dialog',
      width: '95%',
      maxWidth: '500px',
      height: 'auto',
      data: sResponse,
    });

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
