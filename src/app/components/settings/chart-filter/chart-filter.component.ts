import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IChartFilter} from '../../../models/IChartFilter';
// @ts-ignore
import moment from 'moment';
moment.locale('de');

@Component({
  selector: 'app-chart-filter',
  templateUrl: './chart-filter.component.html',
  styleUrls: ['./chart-filter.component.scss']
})
export class ChartFilterComponent implements OnInit {

  @Output() update = new EventEmitter<any>();
  @Input() chartFilter: IChartFilter;

  public interval = 'hours';
  public start;
  public end = moment(new Date()).format('YYYY-MM-DDTHH:mm');

  constructor() {
    if (this.chartFilter) {
      this.interval = this.chartFilter.interval;
      this.start = this.chartFilter.start;
      this.end = this.chartFilter.end;
    } else {
      const d = new Date();
      d.setDate(d.getDate() - 1);

      this.start = moment(d).format('YYYY-MM-DDTHH:mm');
    }
  }

  ngOnInit() {
  }

  changedFilter() {
    console.log({
      interval: this.interval,
      start: this.start,
      end: this.end,
    });
    this.update.emit({
      interval: this.interval,
      start: this.start,
      end: this.end,
    });
    console.log(this.interval);
  }
}
