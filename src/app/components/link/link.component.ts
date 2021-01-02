import {Component, ElementRef, OnInit, ViewChildren} from '@angular/core';
import {ILink} from '../../models/ILink.model';
import {ActivatedRoute} from '@angular/router';
import {LinkService} from '../../services/link.service';
import {Observable} from 'rxjs';
import {ILinkStats} from '../../models/ILinkStats.model';
import {environment} from '../../../environments/environment';

import {animate, query, stagger, style, transition, trigger} from '@angular/animations';
import {AddVersionDialogComponent} from '../../dialogs/add-version-dialog/add-version-dialog.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {Chart} from 'chart.js';
// @ts-ignore
import moment from 'moment';
import {IChartFilter} from '../../models/IChartFilter';

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
  public $linkStats: Observable<ILinkStats>;
  public $linkVersions: Observable<ILink[]>;

  public short: string;
  public chart: any;
  public baseUrl = environment.API_URL.replace('https://', '').replace('http://', '');

  public chartFilter: IChartFilter;

  public monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
    'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
  ];

  constructor(private route: ActivatedRoute, private linkService: LinkService,
              private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.route.queryParams.subscribe(params => {
      this.short = params.l;
    });

    const d = new Date();
    d.setDate(d.getDate() - 1);


    this.chartFilter = {
      interval: 'hours',
      start: moment(d).format('YYYY-MM-DDTHH:mm'),
      end: moment(new Date()).format('YYYY-MM-DDTHH:mm'),
    };
  }

  @ViewChildren('canvas') set content(content: ElementRef) {
    if (content) {
      this.loadChart();
    }
  }

  ngOnInit() {
    this.$link = this.linkService.loadLinkByShort(this.short);
    this.$linkVersions = this.linkService.loadLinkVersions(this.short);
    this.$linkStats = this.linkService.loadLinkStats(this.short, false, this.chartFilter);
  }

  public loadChart() {
    this.$linkStats.subscribe((sLinkStats) => {
      const calls = sLinkStats.calls;

      let formatString = 'YYYY-MM-DD';
      let formatStringToBe = 'YYYY.MM.DD';

      switch (this.chartFilter.interval) {
        case 'minutes':
          formatString = 'YYYY-MM-DDTHH:mm';
          formatStringToBe = 'HH:mm';
          break;
        case 'hours':
          formatString = 'YYYY-MM-DDTHH';
          formatStringToBe = 'DD.MM, HH[Uhr]';
          break;
        case 'days':
          formatString = 'YYYY-MM-DD';
          formatStringToBe = 'DD.MM.YYYY';
          break;
        case 'months':
          formatString = 'YYYY-MM';
          formatStringToBe = 'MMM. YYYY';
          break;
      }

      const interval = this.chartFilter.interval;


      if (calls.length > 0) {
        const pre = moment(calls[0].iat, formatString);
        const start = moment(this.chartFilter.start, formatString);

        if (!pre.isSameOrBefore(start)) {
          calls.splice(0, 0, {iat: start.format(formatString), count: 0});
        }

        const post = moment(calls[0].iat, formatString);
        const end = moment(this.chartFilter.end, formatString);

        if (!post.isSameOrAfter(end)) {
          calls.push({iat: end.format(formatString), count: 0});
        }
      }

      for (let i = 0; i < calls.length; i++) {
        if (i + 1 < calls.length) {
          const date1 = moment(calls[i].iat, formatString);
          const date2 = moment(calls[i + 1].iat, formatString);

          calls[i].iat = date1.format(formatString);
          calls[i + 1].iat = date2.format(formatString);

          if (!date1.add(1, interval).isSame(date2)) {
            const obj = {iat: date1.format(formatString), count: 0};
            calls.splice(i + 1, 0, obj);
          }
        }
      }

      const labels = [];
      const data = [];

      calls.forEach((fCall) => {
        labels.push(moment(fCall.iat).format(formatStringToBe));
        data.push(+fCall.count);
      });

      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels,
          datasets: [{
            data,
            borderColor: '#2976c4',
            fill: false
          }],
        },
        options: {
          legend: {
            display: false
          },
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              display: true,
              gridLines: {
                color: '#3e3e3e'
              },
              ticks: {
                fontColor: 'white',
                stepSize: 1,
                beginAtZero: true
              },
              scaleLabel: {}
            }],
            xAxes: [{
              gridLines: {
                color: '#3e3e3e'
              },
              ticks: {
                fontColor: 'white',
              },
              scaleLabel: {
                display: true,
                labelString: 'Aufrufe der letzten 24 Stunden',
                fontSize: 20,
                padding: 10,
              },
            }]
          },
        }
      });
    });
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

  filterUpdated(filter: IChartFilter) {
    this.chartFilter = filter;

    this.$linkStats = this.linkService.loadLinkStats(this.short, false, filter);
  }
}
