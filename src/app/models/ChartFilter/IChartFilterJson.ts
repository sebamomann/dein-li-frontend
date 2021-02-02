import {UpdateIntervalSeconds} from '../UpdateIntervalSeconds.type';
import {UpdateIntervalPreset} from '../UpdateIntervalPreset.type';
import {IIntervalJSON} from '../Interval/IIntervalJSON';

export interface IChartFilterJson {
  isAutoUpdate: boolean;
  updateInterval: UpdateIntervalSeconds;
  preset: UpdateIntervalPreset;
  customInterval: IIntervalJSON;
}
