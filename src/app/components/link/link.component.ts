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

  public monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
    'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
  ];

  public interval = 'days';
  public start = '2020-12-01T13:00';
  public end = '2020-12-25T13:00';

  constructor(private route: ActivatedRoute, private linkService: LinkService,
              private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.route.queryParams.subscribe(params => {
      this.short = params.l;
    });
  }

  @ViewChildren('canvas') set content(content: ElementRef) {
    if (content) {
      this.loadChart();
    }
  }

  ngOnInit() {
    this.$link = this.linkService.loadLinkByShort(this.short);
    this.$linkVersions = this.linkService.loadLinkVersions(this.short);
    this.$linkStats = this.linkService.loadLinkStats(this.short, false, this.interval, this.start, this.end);
  }

  public loadChart() {
    this.$linkStats.subscribe((sLinkStats) => {
      const calls = sLinkStats.calls;

      let formatString = 'YYYY-MM-DD';
      let formatStringToBe = 'YYYY.MM.DD';

      switch (this.interval) {
        case 'minutes':
          formatString = 'YYYY-MM-DDTHH:mm';
          formatStringToBe = 'YYYY.MM.DD, HH:mm';
          break;
        case 'hours':
          formatString = 'YYYY-MM-DDTHH';
          formatStringToBe = 'YYYY.MM.DD, HH';
          break;
        case 'days':
          formatString = 'YYYY-MM-DD';
          formatStringToBe = 'YYYY.MM.DD';
          break;
        case 'months':
          formatString = 'YYYY-MM';
          formatStringToBe = 'YYYY.MM';
          break;
      }

      const interval = this.interval;


      if (calls.length > 0) {
        const pre = moment(calls[0].iat, formatString);
        const start = moment(this.start, formatString);

        if (!pre.isSameOrBefore(start)) {
          calls.splice(0, 0, {iat: start.format(formatString), count: 0});
        }

        const post = moment(calls[0].iat, formatString);
        const end = moment(this.end, formatString);

        if (!post.isSameOrAfter(end)) {
          calls.push({iat: end.format(formatString), count: 0});
        }
      }

      console.log(calls);

      // return;

      for (let i = 0; i < calls.length; i++) {
        if (i + 1 < calls.length) {
          const date1 = moment(calls[i].iat, formatString);
          const date2 = moment(calls[i + 1].iat, formatString);

          calls[i].iat = date1.format(formatStringToBe);
          calls[i + 1].iat = date2.format(formatStringToBe);

          if (!date1.add(1, interval).isSame(date2)) {
            const obj = {iat: date1.format(formatStringToBe), count: 0};
            calls.splice(i + 1, 0, obj);
          }
        }
      }

      const labels = [];
      const data = [];

      calls.forEach((fCall) => {
        labels.push(fCall.iat);
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

  public changedInterval() {
    this.$linkStats = this.linkService.loadLinkStats(this.short, false, this.interval, this.start, this.end);
  }
}
