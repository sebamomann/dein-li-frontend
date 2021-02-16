import * as moment from 'moment';
import {IBasicChartData} from '../models/IBasicChartData';
import {ChartMomentFormat} from '../enum/chart-moment-format.enum';
import {ChartFilter} from '../models/ChartFilter/ChartFilter';
import {Call} from '../models/Call';

moment.locale('de');

export class ChartDataParser {
  public calls: Call[];
  public chartFilter: ChartFilter;

  constructor(chartFilter: ChartFilter, calls: Call[]) {
    this.chartFilter = chartFilter;
    this.calls = calls;
  }

  public parseCallChartData(): IBasicChartData {
    this.mapDatesOfCalls();
    this.extendCallRangeToSetDates();
    this.fillMissingDatasets();

    return this.convertValuesToOutputObject();
  }

  /**
   * Convert timestamps to needed interval format
   */
  private mapDatesOfCalls() {
    const interval = this.chartFilter.preset === 'custom' ? this.chartFilter.customInterval : this.chartFilter.presetInterval;

    this.calls = this.calls.map((mCall) => {
      mCall.iat = moment(mCall.iat).format((ChartMomentFormat[interval.timeUnit]).format);
      return mCall;
    });
  }

  /**
   * Make sure, call array begins and ends at specified dates
   * Append/Prepend dates to array if specified border
   * dates are not present
   */
  private extendCallRangeToSetDates() {
    const interval = this.chartFilter.preset === 'custom' ? this.chartFilter.customInterval : this.chartFilter.presetInterval;

    const chartMomentFormat = (ChartMomentFormat[interval.timeUnit]).format;

    if (this.calls.length > 0) {
      const pre = moment(this.calls[0].iat, chartMomentFormat);
      const start = moment(interval.start, chartMomentFormat);

      if (!pre.isSameOrBefore(start)) {
        this.calls.splice(0, 0, {iat: start.format(chartMomentFormat), count: 0});
      }

      const post = moment(this.calls[this.calls.length - 1].iat, chartMomentFormat);
      const end = moment(interval.end, chartMomentFormat);

      if (!post.isSameOrAfter(end)) {
        this.calls.push({iat: end.format(chartMomentFormat), count: 0});
      }
    } else {
      this.calls[0] = {iat: moment(interval.start).format(chartMomentFormat), count: 0};
      this.calls[1] = {iat: moment(interval.end).format(chartMomentFormat), count: 0};
    }
  }

  /**
   * Fill gaps where no data is present with default data
   */
  private fillMissingDatasets() {
    const interval = this.chartFilter.preset === 'custom' ? this.chartFilter.customInterval : this.chartFilter.presetInterval;

    const chartMomentFormat = (ChartMomentFormat[interval.timeUnit]).format;

    for (let i = 0; i < this.calls.length; i++) {
      if (i + 1 < this.calls.length) {
        if (i > 500) {
          console.log('FAILURE - More than 500 Datapoints');
          break;
        }

        const date1 = moment(this.calls[i].iat, chartMomentFormat);
        const date2 = moment(this.calls[i + 1].iat, chartMomentFormat);


        this.calls[i].iat = date1.format(chartMomentFormat);
        this.calls[i + 1].iat = date2.format(chartMomentFormat);

        date1.add(1, (ChartMomentFormat[interval.timeUnit]).momentInterval);

        if (!date1.isSame(date2)) {
          if (date1.isAfter(date2)) {
            this.calls[i - 1].count = +this.calls[i - 1].count + +this.calls[i].count;
            delete this.calls[i].count; // mark value to be deleted
          } else {
            const obj = {iat: date1.format(chartMomentFormat), count: 0};
            this.calls.splice(i + 1, 0, obj);
          }
        }
      }
    }
  }


  /**
   * Convert data to needed data format
   * Convert labels to needed Label format
   */
  private convertValuesToOutputObject(): IBasicChartData {
    const labels = [];
    const values = [];

    const interval = this.chartFilter.preset === 'custom' ? this.chartFilter.customInterval : this.chartFilter.presetInterval;

    this.calls.forEach((fCall) => {
      if (fCall.count !== undefined) {
        labels.push(moment(fCall.iat).format((ChartMomentFormat[interval.timeUnit]).labelFormat));
        values.push(+fCall.count);
      }
    });

    return {labels, values};
  }
}
