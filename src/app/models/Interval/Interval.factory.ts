import {UpdateIntervalPreset} from '../../types/UpdateIntervalPreset.type';
import {IntervalPreset} from './IntervalPreset.class';
import {IntervalCustom} from './IntervalCustom.class';

export class IntervalFactory {
  public static createPresetInterval(preset: UpdateIntervalPreset): IntervalPreset {
    const interval = new IntervalPreset();

    switch (preset) {
      default:
      case 'custom':
      case 'last_15_minutes':
        interval.timespanUnitAmount = 15;
        interval.timespanUnit = 'minutes';
        break;
      case 'last_hour':
        interval.timespanUnitAmount = 1;
        interval.timespanUnit = 'hours';
        interval.timeUnit = 'minutes';
        break;
      case 'last_12_hours':
        interval.timespanUnitAmount = 12;
        interval.timespanUnit = 'hours';
        interval.timeUnit = 'hours';
        break;
      case 'last_day':
        interval.timespanUnitAmount = 24;
        interval.timespanUnit = 'hours';
        interval.timeUnit = 'hours';
        break;
    }

    return interval.refreshValues();
  }

  static createCustomInterval() {
    return new IntervalCustom();
  }
}
