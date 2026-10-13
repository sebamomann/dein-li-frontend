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

  private canvas: HTMLCanvasElement;

  /**
   * Upon successful canvas load, initialize the chart
   *
   * @param content ElementRef    HTML Element of the canvas
   */
  @ViewChild('canvas', {static: false})
  set content(content: ElementRef<HTMLCanvasElement>) {
    if (content) {
      this.canvas = content.nativeElement;
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

    const peak = (ctx: any) => this.isPeak(ctx);

    // The activity reads as a constellation: a thin line, a point of light where calls
    // happened, and the busiest moment as the one gold star
    this.chart = new Chart(this.canvas, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          data: [],
          borderColor: '#5D6684',
          borderWidth: 1.5,
          fill: false,
          tension: 0, // straight segments between points, like lines on a star chart
          // let the peak star and its ring draw past the plot edge instead of being cut off
          clip: false,
          pointRadius: (ctx: any) => peak(ctx) ? 4 : (ctx.raw > 0 ? 2.5 : 0),
          pointHoverRadius: 5,
          pointBackgroundColor: (ctx: any) => peak(ctx) ? '#FFD27A' : '#F2F4FF',
          pointBorderWidth: 0,
        }],
      },
      plugins: [{
        // the busiest moment gets a thin solid ring with a gap, the same mark as "your star"
        id: 'peakRing',
        afterDatasetsDraw: (chart: Chart) => {
          const meta = chart.getDatasetMeta(0);
          const data = chart.data.datasets[0]?.data as number[];
          if (!meta || !data?.length) {
            return;
          }
          const max = Math.max(...data);
          const index = data.indexOf(max);
          const point = meta.data[index];
          if (!(max > 0) || !point) {
            return;
          }
          const c = chart.ctx;
          c.save();
          c.beginPath();
          c.arc(point.x, point.y, 9, 0, Math.PI * 2);
          c.lineWidth = 1;
          c.strokeStyle = '#FFD27A';
          c.stroke();
          c.restore();
        },
      }],
      options: {
        maintainAspectRatio: false,
        animation: {duration: 400},
        // headroom so the peak star and its ring are never clipped by the top edge
        layout: {padding: {top: 14, right: 8}},
        interaction: {mode: 'index', intersect: false},
        plugins: {
          legend: {display: false},
          tooltip: {
            backgroundColor: '#151B2E',
            borderColor: '#2C3652',
            borderWidth: 1,
            titleColor: '#8B95B2',
            bodyColor: '#F2F4FF',
            titleFont: {family: 'Sora', size: 12, weight: 400},
            bodyFont: {family: 'Sora', size: 14, weight: 600},
            padding: 10,
            displayColors: false,
            callbacks: {
              label: (item: any) => `${item.formattedValue} ${item.raw === 1 ? 'Aufruf' : 'Aufrufe'}`,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            border: {display: false},
            grid: {color: '#1E2638'},
            ticks: {
              color: '#8B95B2',
              font: {family: 'Sora', size: 12},
              precision: 0,
              maxTicksLimit: 5,
              padding: 8,
            },
          },
          x: {
            border: {color: '#2C3652'},
            grid: {display: false},
            ticks: {
              color: '#8B95B2',
              font: {family: 'Sora', size: 12},
              maxRotation: 0,
              autoSkipPadding: 18,
              maxTicksLimit: (this.isSmallScreen ? 5 : 12),
            },
          }
        },
      }
    });

    this.listenToDataChanges();

    this.initialized = true;
  }

  public get stats(): ILinkStats {
    return this.linkStats$$.getValue();
  }

  private isPeak(ctx: any): boolean {
    const data = ctx.dataset?.data as number[];
    if (!data || !data.length || !(ctx.raw > 0)) {
      return false;
    }
    return ctx.dataIndex === data.indexOf(Math.max(...data));
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
