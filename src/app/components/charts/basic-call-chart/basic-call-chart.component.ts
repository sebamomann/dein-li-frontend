import {Component, ElementRef, Input, OnInit, ViewChildren} from '@angular/core';
import {IChartFilter} from '../../../models/IChartFilter';
import {LinkService} from '../../../services/link.service';

import {Chart} from 'chart.js';
import * as moment from 'moment';
import {BehaviorSubject} from 'rxjs';
import {ILinkStats} from '../../../models/ILinkStats.model';
import {ChartDataParser} from '../../../_helper/chart-data.parser';
import {BreakpointObserver} from '@angular/cdk/layout';

moment.locale('de');

@Component({
  selector: 'app-basic-call-chart',
  templateUrl: './basic-call-chart.component.html',
  styleUrls: ['./basic-call-chart.component.scss']
})
export class BasicCallChartComponent implements OnInit {

  @Input() short: string;
  @Input() chartFilter: IChartFilter;

  public linkStats$$ = new BehaviorSubject<ILinkStats>(undefined);
  public chart;
  private isSmallScreen: boolean;


  constructor(private readonly linkService: LinkService, private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe('(max-width: 1024px)')
      .subscribe((val) => {
        this.isSmallScreen = val.matches;
        this.initializeChart();
      });
  }

  @ViewChildren('canvas') set content(content: ElementRef) {
    if (content) {
      this.loadChart();
    }
  }

  ngOnInit() {
  }

  public loadChart() {
    this.initializeChart();

    this.loadNewData();
  }

  loadNewData() {
    console.log('loadData');

    this.linkService.loadLinkStats(this.short, false, this.chartFilter).toPromise().then((res) => this.linkStats$$.next(res));
  }

  private initializeChart() {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: [] = [],
        datasets: [{
          data: [] = [],
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
              beginAtZero: true,
              maxTicksLimit: 10
            },
            scaleLabel: {}
          }],
          xAxes: [{
            gridLines: {
              color: '#3e3e3e'
            },
            ticks: {
              fontColor: 'white',
              maxRotation: 90,
              minRotation: 0,
              maxTicksLimit: (this.isSmallScreen ? 10 : 50)
            },
            scaleLabel: {
              display: true,
              fontSize: 20,
            },
          }]
        },
      }
    });

    this.listenToDataChanges();
  }

  private listenToDataChanges() {
    this.linkStats$$.subscribe((sLinkStats) => {
      if (sLinkStats) {
        const calls = sLinkStats.calls;

        const chartDataParser = new ChartDataParser(this.chartFilter, calls);
        const data = chartDataParser.parseCallChartData();

        this.chart.data.labels = data.labels;
        this.chart.data.datasets[0].data = data.values;

        this.chart.update();
      }
    });
  }
}
