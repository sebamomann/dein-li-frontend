import * as moment from 'moment';
import {Interval} from './Interval.class';
import {IIntervalCustomJSON} from './IIntervalCustomJSON';

export class IntervalCustom extends Interval {
  /**
   * @inheritDoc
   */
  constructor() {
    super();

    this.setDefaults();
  }

  // --------------------------------------------------------

  /**
   * Start should always be the current date
   */
  private _isLive: boolean;

  get isLive(): boolean {
    return this._isLive;
  }

  set isLive(value: boolean) {
    this._isLive = value;
  }

  // --------------------------------------------------------
  // --------------------------------------------------------
  // --------------------------------------------------------

  /**
   * override
   */
  public get end(): string {
    if (this.isLive) {
      return moment().format('YYYY-MM-DDTHH:mm');
    }

    return this._end;
  }

  /**
   * @param value
   *
   * override forced due to getter override
   */
  public set end(value: string) {
    this._end = value;
  }

  /**
   * Set default preset interval (last 15 minutes).<br/>
   * Make sure to update the start and end time based on that.<br/>
   *
   * override
   */
  public setDefaults(): void {
    this.isLive = false;

    super.setDefaults();
  }

  /**
   * @inheritDoc
   */
  public toJson(): IIntervalCustomJSON {
    return {
      end: this.end,
      start: this.start,
      timeUnit: this.timeUnit,
      isLive: this.isLive
    };
  }
}
