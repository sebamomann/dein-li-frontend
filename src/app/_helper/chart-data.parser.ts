import {Injectable} from '@angular/core';
import {IChartFilter} from '../models/IChartFilter';
import * as moment from 'moment';
import {ICall} from '../models/ICall';
import {IBasicChartData} from '../models/IBasicChartData';
import {ChartMomentFormat} from '../enum/chart-moment-format.enum';

moment.locale('de');

@Injectable()
export class ChartDataParser {
  public calls: ICall[];
  public chartFilter: IChartFilter;

  constructor(chartFilter: IChartFilter, calls: ICall[]) {
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
    this.calls = this.calls.map((mCall) => {
      mCall.iat = moment(mCall.iat).format((ChartMomentFormat[this.chartFilter.interval]).format);
      return mCall;
    });
  }

  /**
   * Make sure, call array begins and ends at specified dates
   * Append/Prepend dates to array if specified border
   * dates are not present
   */
  private extendCallRangeToSetDates() {
    const chartMomentFormat = (ChartMomentFormat[this.chartFilter.interval]).format;

    if (this.calls.length > 0) {
      const pre = moment(this.calls[0].iat, chartMomentFormat);
      const start = moment(this.chartFilter.start, chartMomentFormat);

      if (!pre.isSameOrBefore(start)) {
        this.calls.splice(0, 0, {iat: start.format(chartMomentFormat), count: 0});
      }

      const post = moment(this.calls[this.calls.length - 1].iat, chartMomentFormat);
      const end = moment(this.chartFilter.end, chartMomentFormat);

      if (!post.isSameOrAfter(end)) {
        this.calls.push({iat: end.format(chartMomentFormat), count: 0});
      }
    } else {
      this.calls[0] = {iat: moment(this.chartFilter.start).format(chartMomentFormat), count: 0};
      this.calls[1] = {iat: moment(this.chartFilter.end).format(chartMomentFormat), count: 0};
    }
  }

  /**
   * Fill gaps where no data is present with default data
   */
  private fillMissingDatasets() {
    const chartMomentFormat = (ChartMomentFormat[this.chartFilter.interval]).format;

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

        if (!date1.add(1, (ChartMomentFormat[this.chartFilter.interval]).momentInterval).isSame(date2)) {
          const obj = {iat: date1.format(chartMomentFormat), count: 0};
          this.calls.splice(i + 1, 0, obj);
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

    this.calls.forEach((fCall) => {
      labels.push(moment(fCall.iat).format((ChartMomentFormat[this.chartFilter.interval]).labelFormat));
      values.push(+fCall.count);
    });

    return {labels, values};
  }
}
