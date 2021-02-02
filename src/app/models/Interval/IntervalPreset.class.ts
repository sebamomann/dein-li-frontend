import {Interval} from './Interval.class';
import {TimeUnit} from '../../types/TimeUnit.type';

export class IntervalPreset extends Interval {
  /**
   * @inheritDoc
   */
  constructor() {
    super();

    this.setDefaults();
  }

  // --------------------------------------------------------

  /**
   * Number of interval elements to go back from current date.
   * Eg. (15) minutes
   */
  private _timespanUnitAmount: number;

  get timespanUnitAmount(): number {
    return this._timespanUnitAmount;
  }

  set timespanUnitAmount(value: number) {
    this._timespanUnitAmount = value;
  }

  // --------------------------------------------------------

  /**
   * Interval indicator to go back x times from current date.
   * Eg. 15 (minutes)
   */
  private _timespanUnit: TimeUnit;

  get timespanUnit(): TimeUnit {
    return this._timespanUnit;
  }

  set timespanUnit(value: TimeUnit) {
    this._timespanUnit = value;
  }

  // --------------------------------------------------------

  /**
   * Set default preset interval (last 15 minutes).<br/>
   * Make sure to update the start and end time based on that.<br/>
   *
   * override
   */
  public setDefaults(): void {
    this.timespanUnitAmount = 15;
    this.timeUnit = 'minutes';

    this.refreshValues();
  }

  /**
   * Refresh dates. <br/>
   * Used on auto update chart due to progressing time
   *
   * override
   */
  public refreshValues(): IntervalPreset {
    this.setTimespanFromNowToPast(this.timespanUnitAmount, this.timespanUnit);

    return this;
  }
}
