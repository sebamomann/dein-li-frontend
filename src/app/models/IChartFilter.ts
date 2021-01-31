import {IInterval} from './IInterval';
import {UpdateIntervalPreset} from './UpdateIntervalPreset.type';
import {UpdateIntervalSeconds} from './UpdateIntervalSeconds.type';

export interface IChartFilter {
  isAutoUpdate: boolean;
  updateInterval: UpdateIntervalSeconds;
  preset: UpdateIntervalPreset;
  customInterval: IInterval;
  presetInterval: IInterval;
}
