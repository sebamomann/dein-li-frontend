import {Component, OnInit} from '@angular/core';
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
  public userIsLoggedIn: any;

  public chartFilter: IChartFilter;

  constructor(public linkService: LinkService, private formBuilder: FormBuilder,
              private authService: AuthenticationService, private dialog: MatDialog,
              private toolbarService: ToolbarService) {
    this.userIsLoggedIn = this.authService.userIsLoggedIn();

    const d = new Date();
    d.setDate(d.getDate() - 1);


    this.chartFilter = {
      interval: 'hours',
      start: moment(d).format('YYYY-MM-DDTHH:mm'),
      end: moment(new Date()).format('YYYY-MM-DDTHH:mm'),
    };

    this.toolbarService.setTitle('Home');
  }

  ngOnInit() {
    this.event = this.formBuilder.group({
      link: new FormControl('', [Validators.required]),
    });

    this.$totalStats = this.linkService.loadLinkStats('all', false, {interval: 'hours', start: undefined, end: undefined});
  }


  public getLinkErrorMessage(): string {
    if (this.get('link').hasError('invalid')) {
      return 'Gebe einen gültigen Link ein ';
    } else if (this.get('link').hasError('required')) {
      return 'Bitte gebe einen Link ein';
    }
  }

  saveFnc() {
    const link = this.get('link').value;

    if (!validUrl.isUri(link)) {
      this.get('link').setErrors({invalid: true});
      return;
    }

    this.linkService.create(link).subscribe((sResponse) => {
      const dialogRef = this.dialog.open(SuccessfulCreationDialogComponent, {
        id: 'successful-creation-dialog',
        width: '80%',
        maxWidth: '500px',
        height: 'auto',
        data: sResponse,
      });
    });
  }

  public filterUpdated(filter: IChartFilter) {
    this.chartFilter = filter;
  }

  private get(str: string) {
    return this.event.get(str);
  }
}
