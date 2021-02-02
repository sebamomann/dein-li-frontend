// @ts-ignore
import moment from 'moment';
import {IInterval} from './IInterval';
import {IIntervalJSON} from './IIntervalJSON';
import {TimeUnit} from '../../types/TimeUnit.type';

moment.locale('de');

export class Interval implements IInterval {

  /**
   * Initialize object with default values
   */
  constructor() {
    this.setDefaults();
  }

  // --------------------------------------------------------

  /**
   * Time unit the chart will represent the data with.<br/>
   * Distance between datapoints is 1 timeUnit.<br/>
   * Also used in API request for data grouping
   */
  private _timeUnit: TimeUnit;

  get timeUnit(): TimeUnit {
    return this._timeUnit;
  }

  set timeUnit(value: TimeUnit) {
    this._timeUnit = value;
  }

  // --------------------------------------------------------

  /**
   * End date of the specified timespan.<br/>
   * On preset methods its always the current time.<br/>
   * Custom timespan is usually fix
   */
  private _end: string;

  get end(): string {
    return this._end;
  }

  set end(value: string) {
    this._end = value;
  }

  // --------------------------------------------------------

  /**
   * Start date of the specified timespan.<br/>
   * On preset methods its always x timeUnits behind the current time. {@see _end}<br/>
   * On custom timespan is always fix
   */
  private _start: string;

  get start(): string {
    return this._start;
  }

  set start(value: string) {
    this._start = value;
  }

  // --------------------------------------------------------
  // --------------------------------------------------------
  // --------------------------------------------------------

  /**
   * @inheritDoc
   */
  public setTimespanFromNowToPast(amount: number, timeUnit: TimeUnit): void {
    const date = moment();

    this.end = date.format('YYYY-MM-DDTHH:mm');
    this.start = date.subtract(amount, timeUnit).format('YYYY-MM-DDTHH:mm');
  }

  /**
   * Set default custom interval (last 24 hours)<br/>
   * Make sure to update the start and end time based on that.<br/>
   */
  public setDefaults(): void {
    this.timeUnit = 'hours';

    this.setTimespanFromNowToPast(1, 'days');
  }

  /**
   * @deprecated Function should not be used in this context. Only called on PresetObject
   */
  public refreshValues(): void {
    this.setDefaults();
  }

  /**
   * @inheritDoc
   */
  public toJson(): IIntervalJSON {
    return {
      end: this.end,
      start: this.start,
      timeUnit: this.timeUnit,
    };
  }
}
