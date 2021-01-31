import * as moment from 'moment';
import {Duration} from 'moment';

export class DateUtil {
  // TODO moment JS
  private static MONTHNAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
    'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
  ];

  /**
   * Get abbreviation of passed date.
   *
   * @param date Date
   */
  public static getMonthAbbreviationByDate(date: Date) {
    return this.MONTHNAMES[date.getMonth()];
  }

  /**
   * Get current day of passed date.<br/>
   * Date is a number between 1 and 31
   *
   * @param date Date
   */
  public static getDayByDate(date: Date) {
    return date.getDate();
  }

  /**
   * Calculate difference between two Dates.
   *
   * @param start Date    Start date
   * @param end Date      End date
   *
   * @return duration Duration   Moment representation for duration
   */
  public static getTimeDifference(start: Date, end: Date): Duration {
    return moment.duration(moment(end).diff(moment(start)));
  }
}
