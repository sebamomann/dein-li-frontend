import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IChartFilter} from '../../../models/IChartFilter';
// @ts-ignore
import moment from 'moment';
import {MatSnackBar} from '@angular/material';

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
  public intervals = ['minutes', 'hours', 'days', 'months'];
  public start;
  public end = moment(new Date()).format('YYYY-MM-DDTHH:mm');
  public defaultOptions: { value: string, text: string }[];
  public options: { value: string, text: string }[];

  constructor(private readonly snackBar: MatSnackBar) {
    if (this.chartFilter) {
      this.interval = this.chartFilter.interval;
      this.start = this.chartFilter.start;
      this.end = this.chartFilter.end;
    } else {
      const d = new Date();
      d.setDate(d.getDate() - 1);

      this.start = moment(d).format('YYYY-MM-DDTHH:mm');
    }

    this.defaultOptions = [
      {
        value: 'minutes',
        text: 'Minuten'
      }, {
        value: 'hours',
        text: 'Stunden'
      }, {
        value: 'days',
        text: 'Tage'
      }, {
        value: 'months',
        text: 'Monate'
      }
    ];

    this.options = this.defaultOptions;
  }

  ngOnInit() {
    this.changedFilter();
  }

  changedFilter() {
    const index = this.intervals.indexOf(this.interval);

    const duration = moment.duration(moment(this.end).diff(moment(this.start)));

    const nrOfPointsMin = duration.asMinutes();
    const nrOfPointsHour = duration.asHours();
    const nrOfPointsDays = duration.asDays();

    const minPossIndex = nrOfPointsMin < 500 ? 0 : (nrOfPointsHour < 500 ? 1 : (nrOfPointsDays < 500 ? 2 : 3));

    this.options = this.defaultOptions.slice(minPossIndex, this.defaultOptions.length);

    if (index < minPossIndex) {
      console.log('INDEX ' + index + ' NOT POSSIBLE, REPLACE BY ' + minPossIndex);

      this.snackBar.open(`'${this.defaultOptions[index].text}' nicht möglich als Intervall. Ersetzt durch '${this.defaultOptions[minPossIndex].text}'`, null, {
        duration: 2000,
        panelClass: 'snackbar-default'
      });

      this.interval = this.intervals[minPossIndex];
    }

    this.update.emit({
      interval: this.interval,
      start: this.start,
      end: this.end,
    });
  }
}
