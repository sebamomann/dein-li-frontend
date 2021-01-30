import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {ILinkStats} from '../../models/ILinkStats.model';
import {LinkService} from '../../services/link.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {MatDialog} from '@angular/material';
import {SuccessfulCreationDialogComponent} from '../../dialogs/successful-creation-dialog/successful-creation-dialog.component';
import {ToolbarService} from '../../services/toolbar.service';
import {IChartFilter} from '../../models/IChartFilter';
// @ts-ignore
import moment from 'moment';
import {HttpErrorResponse} from '@angular/common/http';
import {BasicCallChartComponent} from '../charts/basic-call-chart/basic-call-chart.component';
import {UrlUtil} from '../../_util/Url.util';

moment.locale('de');

// @ts-ignore
const validUrl = require('valid-url');

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public chart;
  public $totalStats: Observable<ILinkStats>;
  public event: FormGroup;
  public userIsLoggedIn: boolean;

  public chartFilter: IChartFilter;

  public baseUrl = UrlUtil.getApiDomain();
  public highlightHint = false;

  @ViewChild('chartRef', {static: true}) public chartRef: BasicCallChartComponent;

  constructor(public linkService: LinkService, private formBuilder: FormBuilder,
              private authService: AuthenticationService, private dialog: MatDialog,
              private toolbarService: ToolbarService) {
    this.userIsLoggedIn = this.authService.userIsLoggedIn();

    this.toolbarService.setTitle('Home');

    let chartFilter;

    try {
      chartFilter = JSON.parse(localStorage.getItem('chartFilter'));
      if (!chartFilter) {
        throw Error();
      }
      this.chartFilter = chartFilter;
    } catch {
      const end = moment(new Date()).format('YYYY-MM-DDTHH:mm');

      const d = new Date();
      d.setDate(d.getDate() - 1);

      this.chartFilter = {
        isAutoUpdate: false,
        updateInterval: 15,
        preset: 'last_15_minutes',
        presetInterval: {
          elementInterval: 'hours',
          start: moment(d).format('YYYY-MM-DDTHH:mm'),
          end: moment(end).format('YYYY-MM-DDTHH:mm'),
        },
        customInterval: {
          elementInterval: 'hours',
          start: moment(d).format('YYYY-MM-DDTHH:mm'),
          end: moment(end).format('YYYY-MM-DDTHH:mm'),
        }
      };
    }
  }

  ngOnInit() {
    this.event = this.formBuilder.group({
      link: new FormControl('', [Validators.required]),
      short: new FormControl({value: '', disabled: !this.userIsLoggedIn}, [Validators.minLength(3)]),
    });

    this.$totalStats = this.linkService.loadLinkStats('all', false, this.chartFilter);
  }


  public getLinkErrorMessage(): string {
    if (this.get('link').hasError('invalid')) {
      return 'Gebe einen gültigen Link ein ';
    } else if (this.get('link').hasError('required')) {
      return 'Bitte gebe einen Link ein';
    }
  }

  public getShortErrorMessage(): string {
    if (this.get('short').hasError('inUse')) {
      return 'Dieser Kurzlink ist bereits vergeben';
    } else if (this.get('short').hasError('unprocessable')) {
      return 'Invalide Zeichen';
    } else if (this.get('short').hasError('minlength')) {
      return 'Der Kurzlink muss mindestens 3 Zeichen lang sein';
    }
  }

  public saveFnc() {
    const link = this.get('link').value;
    const short = this.get('short').value;

    if (!validUrl.isUri(link)) {
      this.get('link').setErrors({invalid: true});
      return;
    }

    if (!this.event.valid) {
      return;
    }

    this.linkService.create(link, short)
      .subscribe(
        (sResponse) => {
          if (sResponse instanceof HttpErrorResponse) {
            if (sResponse.status === 404) {
              this.event.get('short').setErrors({inUse: true});
            } else if (sResponse.status === 422) {
              this.event.get('short').setErrors({unprocessable: true});
            }
          } else {
            this.dialog.open(SuccessfulCreationDialogComponent, {
              id: 'successful-creation-dialog',
              width: '80%',
              maxWidth: '500px',
              height: 'auto',
              data: sResponse,
            });
          }
        },
        () => {
          console.log(123);
        });
  }

  public filterUpdated(filter: IChartFilter) {
    console.log('updated');
    console.log(this.chartFilter);
    console.log(filter);

    this.chartFilter = filter;
  }

  public get(str: string) {
    return this.event.get(str);
  }

  public selectShort() {
    this.highlightHint = false;

    this.highlightHint = this.userIsLoggedIn === false;
  }
}
