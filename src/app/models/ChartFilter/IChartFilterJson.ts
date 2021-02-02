import {UpdateIntervalSeconds} from '../../types/UpdateIntervalSeconds.type';
import {UpdateIntervalPreset} from '../../types/UpdateIntervalPreset.type';
import {IIntervalJSON} from '../Interval/IIntervalJSON';

export interface IChartFilterJson {
  isAutoUpdate: boolean;
  updateInterval: UpdateIntervalSeconds;
  preset: UpdateIntervalPreset;
  customInterval: IIntervalJSON;
}
