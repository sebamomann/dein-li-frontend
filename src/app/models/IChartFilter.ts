export type ElementInterval = 'minutes' | 'hours' | 'days' | 'months';
export type UpdateIntervalSeconds = 15 | 30 | 60 | 300 | 9000;
export type UpdateIntervalPreset = 'custom' | 'last_15_minutes' | 'last_hour' | 'last_12_hours' | 'last_day';

export interface IChartFilter {
  isAutoUpdate: boolean;
  updateInterval: UpdateIntervalSeconds;
  preset: UpdateIntervalPreset;
  customInterval: ICustomInterval;
  presetInterval: ICustomInterval;
}

export interface ICustomInterval {
  start: Date;
  end: Date;
  elementInterval: ElementInterval;
}
