import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
// @ts-ignore
import moment from 'moment';
import {MatSnackBar} from '@angular/material';
import {BreakpointObserver} from '@angular/cdk/layout';
import {animate, style, transition, trigger} from '@angular/animations';
import {ChartFilter} from '../../../models/ChartFilter';
import {ElementInterval} from '../../../models/ElementInterval.type';

moment.locale('de');

@Component({
  selector: 'app-chart-filter',
  templateUrl: './chart-filter.component.html',
  styleUrls: ['./chart-filter.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({opacity: '0', height: '0px', paddingBottom: 0, paddingTop: 0, marginBottom: 0}),
        animate('500ms ease-in', style({opacity: 1, height: '*', paddingBottom: '*', paddingTop: '*', marginBottom: '*'}))
      ]),
      transition('* => void',
        animate('500ms ease-out', style({opacity: 0, height: '0px', paddingBottom: 0, paddingTop: 0, marginBottom: 0})))
    ])
  ]
})
export class ChartFilterComponent implements OnInit {

  @Output() update = new EventEmitter<any>();
  @Input() chartFilter: ChartFilter;
  public intervals: ElementInterval[] = ['minutes', 'hours', 'days', 'months'];
  public defaultOptions: { value: string, text: string }[];
  public options: { value: string, text: string }[];
  public barPercentage: number;
  public timeInterval: any;
  public timeIntervalBar: any;
  public isSmallScreen;
  public showExpansion = false;
  public showFilterButton = true;

  constructor(private readonly snackBar: MatSnackBar, private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe('(max-width: 1024px)')
      .subscribe((val) => {
        this.isSmallScreen = val.matches;
      });

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
    this.changedUpdateInterval(this.chartFilter.isAutoUpdate);
  }

  changedFilter() {
    if (!this.chartFilter) {
      return;
    }

    if (this.chartFilter.preset === 'custom') {
      const index = this.intervals.indexOf(this.chartFilter.customInterval.elementInterval);

      const duration = moment.duration(moment(this.chartFilter.customInterval.end).diff(moment(this.chartFilter.customInterval.start)));

      const nrOfPointsMin = duration.asMinutes();
      const nrOfPointsHour = duration.asHours();
      const nrOfPointsDays = duration.asDays();

      const minPossIndex = nrOfPointsMin < 500 ? 0 : (nrOfPointsHour < 500 ? 1 : (nrOfPointsDays < 500 ? 2 : 3));

      this.options = this.defaultOptions.slice(minPossIndex, this.defaultOptions.length);

      if (index < minPossIndex) {
        console.log('INDEX ' + index + ' NOT POSSIBLE, REPLACE BY ' + minPossIndex);

        this.snackBar.open(
          `'${this.defaultOptions[index].text}' nicht möglich als Intervall. Ersetzt durch '${this.defaultOptions[minPossIndex].text}'`,
          null,
          {
            duration: 2000,
            panelClass: 'snackbar-default'
          });

        this.chartFilter.customInterval.elementInterval = this.intervals[minPossIndex];
      }
    } else {
      this.chartFilter.handlePresetChange();
    }

    // Timeout to wait for ngModel
    setTimeout(() => this.chartFilter.saveToStorage());

    this.update.emit(this.chartFilter);
  }

  public changedUpdateInterval(refresh: boolean) {
    this.changedFilter();

    let millis = 0;

    clearInterval(this.timeInterval);
    clearInterval(this.timeIntervalBar);

    if (refresh) {
      this.timeInterval = setInterval(() => {
        this.changedFilter();
        millis = 0;
      }, this.chartFilter.updateInterval * 1000);

      this.timeIntervalBar = setInterval(() => {
        const total = this.chartFilter.updateInterval * 1000;
        millis += 100;

        this.barPercentage = Math.round(millis / total * 100);
      }, 100);
    }
  }

  showFilterClick() {
    this.showExpansion = !this.showExpansion;
  }
}
