import {LinkService} from '../../../services/link.service';
import {ILinkStats} from '../../../models/ILinkStats.model';
import {ChartDataParser} from '../../../_helper/chart-data.parser';

import moment from 'moment';

import {Chart, registerables} from 'chart.js';
import {BehaviorSubject, Subscription} from 'rxjs';
import {BreakpointObserver} from '@angular/cdk/layout';
import {Component, ElementRef, Input, OnInit, ViewChild, ChangeDetectionStrategy} from '@angular/core';
import {ChartFilter} from '../../../models/ChartFilter/ChartFilter';
import {animate, style, transition, trigger} from '@angular/animations';

moment.locale('de');

Chart.register(...registerables);

@Component({
    selector: 'app-basic-call-chart',
    templateUrl: './basic-call-chart.component.html',
    styleUrls: ['./basic-call-chart.component.scss'],
    animations: [
        trigger('remove', [
            transition('* => void', [
                style({ opacity: '1' }),
                animate('250ms ease-in', style({ opacity: 0 }))
            ]),
        ])
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class BasicCallChartComponent implements OnInit {

  @Input() short: string;
  @Input() chartFilter: ChartFilter;

  public linkStats$$ = new BehaviorSubject<ILinkStats>(undefined);

  public chart: Chart;

  private dataSubscription: Subscription;

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
    // Chart.js >= 3 refuses to reuse a canvas that still has a chart attached
    this.chart?.destroy();

    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          data: [],
          borderColor: '#2976c4',
          fill: false,
          tension: 0.4, // Chart.js 2 drew curved lines by default
        }],
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
        },
        scales: {
          y: {
            display: true,
            beginAtZero: true,
            grid: {
              color: '#3e3e3e'
            },
            ticks: {
              color: 'white',
              stepSize: 1,
              maxTicksLimit: 10
            },
          },
          x: {
            grid: {
              color: '#3e3e3e'
            },
            ticks: {
              color: 'white',
              maxRotation: 90,
              minRotation: 0,
              maxTicksLimit: (this.isSmallScreen ? 10 : 50)
            },
            // The Chart.js 2 config showed an (empty) axis label, which reserves space below the axis
            title: {
              display: true,
              font: {size: 20},
            },
          }
        },
      }
    });

    this.listenToDataChanges();

    this.initialized = true;
  }

  private listenToDataChanges() {
    // initializeChart() runs again on breakpoint changes - don't stack subscriptions
    this.dataSubscription?.unsubscribe();
    this.dataSubscription = this.linkStats$$.subscribe((sLinkStats) => {
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
