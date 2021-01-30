import {Component, OnInit, ViewChild} from '@angular/core';
import {ILink} from '../../models/ILink.model';
import {ActivatedRoute} from '@angular/router';
import {LinkService} from '../../services/link.service';
import {Observable} from 'rxjs';

import {animate, query, stagger, style, transition, trigger} from '@angular/animations';
import {AddVersionDialogComponent} from '../../dialogs/add-version-dialog/add-version-dialog.component';
import {MatDialog, MatSnackBar} from '@angular/material';
// @ts-ignore
import moment from 'moment';
import {IChartFilter} from '../../models/IChartFilter';
import {BasicCallChartComponent} from '../charts/basic-call-chart/basic-call-chart.component';
import {UrlUtil} from '../../_util/Url.util';

moment.locale('de');

export const fadeAnimation = trigger('listAnimation', [
  transition('* <=> *', [
    query(':enter',
      [style({opacity: 0, transform: 'translateY(-10px)'}), stagger('60ms', animate('600ms ease-out', style({
        opacity: 1,
        transform: 'translateY(0px)'
      })))],
      {optional: true}
    )
  ])
]);

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  animations: [fadeAnimation]
})
export class LinkComponent implements OnInit {
  public $link: Observable<ILink>;
  public $linkVersions: Observable<ILink[]>;

  public short: string;
  public chart: any;

  public baseUrl = UrlUtil.getApiDomain();

  public chartFilter: IChartFilter;

  // TODO
  public monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
    'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
  ];
  @ViewChild('chartRef', {static: true}) public chartRef: BasicCallChartComponent;

  constructor(private route: ActivatedRoute, private linkService: LinkService,
              private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.route.queryParams.subscribe(params => {
      this.short = params.l;
    });

    // TODO IS DUPE
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
          end,
        },
        customInterval: {
          elementInterval: 'hours',
          start: moment(d).format('YYYY-MM-DDTHH:mm'),
          end,
        }
      };
    }
  }

  ngOnInit() {
    this.$link = this.linkService.loadLinkByShort(this.short);
    this.$linkVersions = this.linkService.loadLinkVersions(this.short);
  }


  getDay(linkVersion: any) {
    return (new Date(linkVersion.iat)).getDate();
  }

  getMonthName(linkVersion: any) {
    return this.monthNames[(new Date(linkVersion.iat)).getMonth()];
  }

  openAddVersionDialog() {
    const dialogRef = this.dialog.open(AddVersionDialogComponent, {
      id: 'add-version-dialog',
      width: '80%',
      maxWidth: '500px',
      height: 'auto',
      data: this.short,
    });

    dialogRef.afterClosed().subscribe(sLink => {
      // TODO can be better
      this.$link = this.linkService.loadLinkByShort(this.short);
      this.$linkVersions = this.linkService.loadLinkVersions(this.short);
    });
  }

  openLinkInNewTab(original: any) {
    window.open(original, '_blank');
  }

  copyLinkToClipboard(link: any, e: Event) {
    e.preventDefault();

    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = link;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    this.snackBar.open('Link in die Zwischenablage kopiert', null, {
      duration: 2000,
      panelClass: 'snackbar-default'
    });
  }

  share(param: any, $event: MouseEvent) {
    let newVariable: any;

    newVariable = window.navigator;

    if (newVariable && newVariable.share) {
      newVariable.share({
        title: 'dein.li Kurzlink',
        text: 'dein.li Kurzlink' + ' - ' + 'Hier, für dich',
        url: param,
      })
        .then(() => console.log('Successful share'))
        .catch((error) => this.copyLinkToClipboard(param, $event));
    } else {
      this.copyLinkToClipboard(param, $event);
    }
  }
}
