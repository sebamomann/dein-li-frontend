import {IChartFilterJson} from './IChartFilterJson';

export interface IChartFilter {
  /**
   * Save current object as a appropriate format (JSON) into localStorage
   */
  saveToStorage(): void;

  /**
   * Convert object to JSON object
   */
  toJson(): IChartFilterJson;

  /**
   * Handle possible change of preset.<br/>
   * Adapt start and end time, based on preset. Also Set correct interval.
   */
  updatePresetValues(): void;
}
