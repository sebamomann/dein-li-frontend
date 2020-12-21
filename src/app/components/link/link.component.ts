import {Component, ElementRef, OnInit, ViewChildren} from '@angular/core';
import {ILink} from '../../models/ILink.model';
import {ActivatedRoute} from '@angular/router';
import {LinkService} from '../../services/link.service';
import {Observable} from 'rxjs';
import {ILinkStats} from '../../models/ILinkStats.model';
import {Chart} from 'chart.js';
import {environment} from '../../../environments/environment';

import {animate, query, stagger, style, transition, trigger} from '@angular/animations';
import {AddVersionDialogComponent} from '../../dialogs/add-version-dialog/add-version-dialog.component';
import {MatDialog, MatSnackBar} from '@angular/material';

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
  public $linkStats: Observable<ILinkStats>;
  public short: string;
  public chart: any;
  public baseUrl = environment.API_URL.replace('https://', '').replace('http://', '');

  public monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
    'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
  ];
  public lastMonth: string;
  public lastDay: number;

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
    this.$linkStats = this.linkService.loadLinkStats(this.short);
  }

  public loadChart() {
    this.$linkStats.subscribe((sLinkStats) => {

      const d = new Date();
      const currentHours = d.getHours();

      let calls = sLinkStats.calls;

      calls = [...calls.slice(currentHours + 1), ...calls.slice(0, currentHours + 1)];


      const labels = [];
      const data = [];

      calls.forEach((fCall) => {
        labels.push(fCall.hour + ':00 Uhr');
        data.push(+fCall.calls);
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
              },
              scaleLabel: {
                display: true,
                labelString: 'Aufrufe',
                fontSize: 20,
                padding: 10,
              }
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
                labelString: 'Uhrzeit',
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

  copyLinkToClipboard(link: any) {
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
}
