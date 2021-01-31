// @ts-ignore
import moment from 'moment';
import {IInterval} from './IInterval';
import {ElementInterval} from './ElementInterval.type';

moment.locale('de');

export class Interval implements IInterval {

  constructor() {
  }

  private _elementInterval: ElementInterval;

  get elementInterval(): ElementInterval {
    return this._elementInterval;
  }

  set elementInterval(value: ElementInterval) {
    this._elementInterval = value;
  }

  private _end: Date;

  get end(): Date {
    return this._end;
  }

  set end(value: Date) {
    this._end = value;
  }

  private _start: Date;

  get start(): Date {
    return this._start;
  }

  set start(value: Date) {
    this._start = value;
  }

  /**
   * Update object to default values.
   */
  public initializeDefault(): Interval {
    const end = moment(new Date()).format('YYYY-MM-DDTHH:mm');

    const d = new Date();
    d.setDate(d.getDate() - 1);

    this.elementInterval = 'hours';
    this.start = moment(d).format('YYYY-MM-DDTHH:mm');
    this.end = moment(end).format('YYYY-MM-DDTHH:mm');

    return this;
  }

  /**
   * Convert object to JSON object
   */
  public toJson(): IInterval {
    return {
      end: this.end,
      start: this.start,
      elementInterval: this.elementInterval,
    };
  }
}
