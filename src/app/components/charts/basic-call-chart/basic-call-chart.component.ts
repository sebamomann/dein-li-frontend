import {LinkService} from '../../../services/link.service';
import {ILinkStats} from '../../../models/ILinkStats.model';
import {ChartDataParser} from '../../../_helper/chart-data.parser';

import * as moment from 'moment';

import {Chart} from 'chart.js';
import {BehaviorSubject} from 'rxjs';
import {BreakpointObserver} from '@angular/cdk/layout';
import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ChartFilter} from '../../../models/ChartFilter/ChartFilter';
import {animate, style, transition, trigger} from '@angular/animations';

moment.locale('de');

@Component({
  selector: 'app-basic-call-chart',
  templateUrl: './basic-call-chart.component.html',
  styleUrls: ['./basic-call-chart.component.scss'],
  animations: [
    trigger('remove', [
      transition('* => void', [
        style({opacity: '1'}),
        animate('250ms ease-in', style({opacity: 0}))
      ]),
    ])
  ]
})
export class BasicCallChartComponent implements OnInit {

  @Input() short: string;
  @Input() chartFilter: ChartFilter;

  public linkStats$$ = new BehaviorSubject<ILinkStats>(undefined);

  public chart;

  private isSmallScreen: boolean;
  private initialized = false;

  /**
   * Make sure to re-initialize chart only, if it has already been initialized once.<br/>
   * Otherwise an error will occur, that the context (canvas) could not be found {@link content}
   */
  constructor(private readonly linkService: LinkService, private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe('(max-width: 1024px)')
      .subscribe((val) => {
        this.isSmallScreen = val.matches;

        if (this.initialized) {
          this.initializeChart();
        }
      });
  }

  /**
   * Upon successful canvas load, initialize the chart
   *
   * @param content ElementRef    HTML Element of the canvas
   */
  @ViewChild('canvas', {static: false})
  set content(content: ElementRef) {
    if (content) {
      setTimeout(() => {
        this.initializeChart();
      });
    }
  }

  /**
   *
   */
  public ngOnInit() {
    this.loadNewData();
  }

  /**
   * Populate BehaviourSubject with new data from the API.
   * This function gets called by the parent periodically. <br/>
   * Only if auto update is enabled in {@link ChartFilterComponent}
   */
  public loadNewData() {
    if (!this.chartFilter) {
      return;
    }

    if (this.short) {
      this.linkService.loadLinkStats(this.short, false, this.chartFilter).toPromise().then((res) => this.linkStats$$.next(res));
    } else {
      this.linkService.loadGlobalLinkStatistics(this.chartFilter).toPromise().then((res) => this.linkStats$$.next(res));
    }
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

    this.initialized = true;
  }

  private listenToDataChanges() {
    this.linkStats$$.subscribe((sLinkStats) => {
      if (sLinkStats && this.chart.canvas) {
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
