import {UpdateIntervalSeconds} from '../../types/UpdateIntervalSeconds.type';
import {UpdateIntervalPreset} from '../../types/UpdateIntervalPreset.type';
import {IIntervalCustomJSON} from '../Interval/IIntervalCustomJSON';

export interface IChartFilterJson {
  isAutoUpdate: boolean;
  updateInterval: UpdateIntervalSeconds;
  preset: UpdateIntervalPreset;
  customInterval: IIntervalCustomJSON;
}
