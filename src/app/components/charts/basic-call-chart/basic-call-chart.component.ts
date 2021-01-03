import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChildren} from '@angular/core';
import {IChartFilter} from '../../../models/IChartFilter';
import {LinkService} from '../../../services/link.service';

import {Chart} from 'chart.js';
// @ts-ignore
import moment from 'moment';

moment.locale('de');

@Component({
  selector: 'app-basic-call-chart',
  templateUrl: './basic-call-chart.component.html',
  styleUrls: ['./basic-call-chart.component.scss']
})
export class BasicCallChartComponent implements OnInit, OnChanges {

  @Input() short: string;
  @Input() chartFilter: IChartFilter;

  public linkStats$;
  public chart;


  constructor(private readonly linkService: LinkService) {
  }

  @ViewChildren('canvas') set content(content: ElementRef) {
    if (content) {
      this.loadChart();
    }
  }

  ngOnInit() {
    this.linkStats$ = this.linkService.loadLinkStats(this.short, false, this.chartFilter);
  }

  public loadChart() {
    this.linkStats$.subscribe((sLinkStats) => {
      let calls = sLinkStats.calls;

      let formatString = 'YYYY-MM-DD';
      let formatStringToBe = 'YYYY.MM.DD';

      switch (this.chartFilter.interval) {
        case 'minutes':
          formatString = 'YYYY-MM-DDTHH:mm';
          formatStringToBe = 'HH:mm';
          break;
        case 'hours':
          formatString = 'YYYY-MM-DDTHH';
          formatStringToBe = 'HH[Uhr]';
          break;
        case 'days':
          formatString = 'YYYY-MM-DD';
          formatStringToBe = 'DD. MMM';
          break;
        case 'months':
          formatString = 'YYYY-MM';
          formatStringToBe = 'MMM YY';
          break;
      }

      calls = calls.map((mCall) => {
        mCall.iat = moment(mCall.iat).format(formatString);
        return mCall;
      });

      const interval = this.chartFilter.interval;


      if (calls.length > 0) {
        const pre = moment(calls[0].iat, formatString);
        const start = moment(this.chartFilter.start, formatString);

        if (!pre.isSameOrBefore(start)) {
          console.log('ADD PRE');
          calls.splice(0, 0, {iat: start.format(formatString), count: 0});
        }

        const post = moment(calls[calls.length - 1].iat, formatString);
        const end = moment(this.chartFilter.end, formatString);

        if (!post.isSameOrAfter(end)) {
          console.log('ADD POST');
          calls.push({iat: end.format(formatString), count: 0});
        }
      }

      for (let i = 0; i < calls.length; i++) {
        if (i + 1 < calls.length) {

          if (i > 500) {
            console.log('FAILURE');
            break;
          }

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
                maxRotation: 90,
                minRotation: 0,
              },
              scaleLabel: {
                display: true,
                fontSize: 20,
              },
            }]
          },
        }
      });
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.linkStats$ = this.linkService.loadLinkStats(this.short, false, this.chartFilter);
  }

}
