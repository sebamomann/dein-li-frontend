import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as moment from 'moment';
import {MatSnackBar} from '@angular/material';
import {animate, style, transition, trigger} from '@angular/animations';
import {ChartFilter} from '../../../models/ChartFilter/ChartFilter';
import {DateUtil} from '../../../_util/Date.util';
import {ChartMomentFormat} from '../../../enum/chart-moment-format.enum';
import {HtmlOption} from '../../../models/HtmlOption';
import {IntervalFactory} from '../../../models/Interval/Interval.factory';
// @ts-ignore
import Timer = NodeJS.Timer;

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
  /**
   * Number of datapoints the chart should be capable of showing
   */
  private static DATAPOINT_THRESHOLD = 500;

  @Input() chartFilter: ChartFilter;
  @Output() update = new EventEmitter<ChartFilter>();

  public timeIntervalOptions: HtmlOption[];
  public barPercentage: number;
  public showFilter = false;

  /**
   * Intervals for data update and update progress bar
   */
  private timerIntervalDataUpdate: Timer;
  private timerIntervalProgressBarUpdate: Timer;

  constructor(private readonly snackBar: MatSnackBar) {
  }

  public ngOnInit() {
    this.changedUpdateInterval(this.chartFilter.isAutoUpdate);
    const minimumPossibleChartMomentFormat = this.getMinimumPossibleInterval(ChartFilterComponent.DATAPOINT_THRESHOLD);
    this.updatePossibleTimeIntervalSelections(minimumPossibleChartMomentFormat);
  }

  /**
   * Called, when the user changed the filter settings in any way. <br/>
   * Causes preset changes to be updated (eg on preset change) or validated the custom set dates and intervals.<br/>
   */
  public changedFilter() {
    if (!this.chartFilter) {
      return;
    }

    if (this.chartFilter.preset === 'custom') {
      const selectedChartMomentFormat = ChartMomentFormat[this.chartFilter.customInterval.timeUnit];

      const minimumPossibleChartMomentFormat = this.getMinimumPossibleInterval(ChartFilterComponent.DATAPOINT_THRESHOLD);
      this.updatePossibleTimeIntervalSelections(minimumPossibleChartMomentFormat);

      if (selectedChartMomentFormat.hasLowerIntervalThan(minimumPossibleChartMomentFormat)) {
        this.createInvalidIntervalSnackbar(selectedChartMomentFormat, minimumPossibleChartMomentFormat);
        this.chartFilter.customInterval.timeUnit = minimumPossibleChartMomentFormat.momentInterval;
      }
    } else {
      this.chartFilter.presetInterval = IntervalFactory.createPresetInterval(this.chartFilter.preset);
    }

    this.chartFilter.saveToStorage();

    this.refreshDataset();
  }

  /**
   * Update Interval has been changed or set.<br/>
   * Reset the current update interval timer and progress bar.<br/>
   *
   * @param refresh boolean   If auto update is enabled or not
   *                          Don't use chartFilter.isAutoUpdate. Value lacks behind due to [(ngModel)]
   */
  public changedUpdateInterval(refresh: boolean) {
    this.refreshDataset();

    this.resetIntervals();

    if (refresh) {
      this.startUpdateInterval();
      this.startProgressBarInterval();
    }

    this.chartFilter.saveToStorage();
  }

  /**
   * Open or close filter based on current state
   */
  public toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  /**
   * Open a Snackbar to show the user, that his custom select interval could not be set. <br/>
   * Selected interval would have more datapoints, than the {@link DATAPOINT_THRESHOLD} allows.
   *
   * @param selectedCMF ChartMomentFormat   Selected interval by the user
   * @param minCMF ChartMomentFormat        Interval forced by system due to threshold
   */
  private createInvalidIntervalSnackbar(selectedCMF: ChartMomentFormat, minCMF: ChartMomentFormat) {
    this.snackBar.open(
      `'${selectedCMF.label}' nicht möglich als Intervall. Ersetzt durch '${minCMF.label}'`,
      null,
      {
        duration: 2000,
        panelClass: 'snackbar-default'
      });
  }

  /**
   * Update possible options that can be selected as chart interval.<br/>
   * Interval is the distance between two datapoints.<br/>
   * See {@link TimeUnit} for possible option
   *
   * @param minimumPossibleChartMomentFormat ChartMomentFormat
   *        Minimum ChartMomentFormat that can be selected, so that there are less datapoints in the chart
   *        than the specified threshold {@link DATAPOINT_THRESHOLD}
   */
  private updatePossibleTimeIntervalSelections(minimumPossibleChartMomentFormat: ChartMomentFormat) {
    const possibleChartMomentFormats = ChartMomentFormat.getElementsBiggerThan(minimumPossibleChartMomentFormat);

    this.timeIntervalOptions = ChartMomentFormat.getOptionArray(possibleChartMomentFormats);
  }

  /**
   * Get the minimum possible interval that can be selected.<br/>
   * Threshold defines number of datapoints the chart is allowed to have.<br/>
   *
   * @param threshold number    Number of datapoints the chart is allowed to have
   */
  private getMinimumPossibleInterval(threshold: number): ChartMomentFormat {
    const startToEndDuration = DateUtil.getTimeDifference(this.chartFilter.customInterval.start, this.chartFilter.customInterval.end);

    const nrOfPointsMin = startToEndDuration.asMinutes();
    const nrOfPointsHour = startToEndDuration.asHours();
    const nrOfPointsDays = startToEndDuration.asDays();

    if (nrOfPointsMin < threshold) {
      return ChartMomentFormat.minutes;
    } else {
      if (nrOfPointsHour < threshold) {
        return ChartMomentFormat.hours;
      } else {
        if (nrOfPointsDays < threshold) {
          return ChartMomentFormat.days;
        } else {
          return ChartMomentFormat.months;
        }
      }
    }
  }

  /**
   * Start timer for automatic data refresh.<br/>
   * Reset previous timer. <br/>
   * Also update preset values (start, end) if any preset is selected
   */
  private startUpdateInterval() {
    clearInterval(this.timerIntervalDataUpdate);

    this.timerIntervalDataUpdate = setInterval(() => {
      if (this.chartFilter.preset !== 'custom' || this.chartFilter.customInterval.isLive) {
        this.chartFilter.updatePresetValues();
        this.refreshDataset();
      }

      this.startProgressBarInterval();
    }, this.chartFilter.updateInterval * 1000);
  }

  /**
   * Start the interval to update the progress bar every 100ms.<br/>
   * Reset previous timer.
   */
  private startProgressBarInterval() {
    clearInterval(this.timerIntervalProgressBarUpdate);

    const refreshRateInMs = 100;
    let millisSinceLastUpdate = 0;
    this.timerIntervalProgressBarUpdate = setInterval(() => {
      millisSinceLastUpdate += refreshRateInMs;
      this.calculateCurrentUpdatePercentage(millisSinceLastUpdate);
    }, refreshRateInMs);
  }

  /**
   * Calculate the current progress percentage.<br/>
   * Percentage represents progress passed till next data refresh
   *
   * @param millisPassed number   Millis passed after last update
   */
  private calculateCurrentUpdatePercentage(millisPassed: number): void {
    const totalMillisTillUpdate = this.chartFilter.updateInterval * 1000;

    this.barPercentage = Math.round(millisPassed / totalMillisTillUpdate * 100);
  }

  /**
   * Reset time intervals for update and progress percentage.
   */
  private resetIntervals() {
    clearInterval(this.timerIntervalDataUpdate);
    clearInterval(this.timerIntervalProgressBarUpdate);
  }

  /**
   * Emit current filter.<br/>
   * Causes dataset to be refreshed.<br/>
   */
  private refreshDataset() {
    this.update.emit(this.chartFilter);
  }
}
