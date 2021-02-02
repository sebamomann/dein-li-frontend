import {IIntervalJSON} from './IIntervalJSON';
import {TimeUnit} from '../TimeUnit.type';

/**
 * Contains function declaration for Interval
 */
export interface IInterval {
  /**
   * Set start and end based on a timespan defined by a duration from now to the past
   *
   * @param amount     Number of time units to subtract from current date
   * @param timeUnit   Time unit
   */
  setTimespanFromNowToPast(amount: number, timeUnit: TimeUnit): void;

  /**
   * Populate object with default values
   */
  setDefaults(): void;

  /**
   * Refresh interval on settings
   */
  refreshValues(): void;

  /**
   * Convert object to JSON Object only containing fields
   */
  toJson(): IIntervalJSON;
}
