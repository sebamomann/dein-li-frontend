// @ts-ignore
import moment from 'moment';
import {IChartFilter} from './IChartFilter';
import {UpdateIntervalPreset} from '../../types/UpdateIntervalPreset.type';
import {UpdateIntervalSeconds} from '../../types/UpdateIntervalSeconds.type';
import {IntervalPreset} from '../Interval/IntervalPreset.class';
import {IntervalFactory} from '../Interval/Interval.factory';
import {IChartFilterJson} from './IChartFilterJson';
import {IntervalCustom} from '../Interval/IntervalCustom.class';

moment.locale('de');

export class ChartFilter implements IChartFilter {
  private LOCAL_STORAGE_KEY = 'chartFilter';

  /**
   * Initialize chart filter.<br/>
   * Fetch from local storage. If no object could be parsed from storage, create a new one.<br/>
   * Newly create object contains default values and gets stored to storage immediately.
   */
  constructor() {
    try {
      const storageData: IChartFilterJson = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY));
      if (!storageData) {
        this.initializeDefault();
      } else {
        Object.assign(this, storageData);
        this.customInterval = Object.assign(new IntervalCustom(), storageData.customInterval);
        this.presetInterval = IntervalFactory.createPresetInterval(this.preset); // create anyway - even if currently not used
      }
    } catch {
      this.initializeDefault();
    }

    this.saveToStorage();
  }

  // --------------------------------------------------------

  /**
   * Interval object, where user sets his own data interval
   */
  private _customInterval: IntervalCustom;

  get customInterval(): IntervalCustom {
    return this._customInterval;
  }

  set customInterval(value: IntervalCustom) {
    this._customInterval = value;
  }

  // --------------------------------------------------------

  /**
   * Enable automatic update of chart data.<br/>
   * Used as internal state change
   */
  private _isAutoUpdate: boolean;

  get isAutoUpdate(): boolean {
    return this._isAutoUpdate;
  }

  set isAutoUpdate(value: boolean) {
    this._isAutoUpdate = value;
  }

  // --------------------------------------------------------

  /**
   * Preset description to activate preset intervals
   */
  private _preset: UpdateIntervalPreset;

  get preset(): UpdateIntervalPreset {
    return this._preset;
  }

  set preset(value: UpdateIntervalPreset) {
    this._preset = value;
  }

  // --------------------------------------------------------

  /**
   * Actual interval based on {@see _preset}
   */
  private _presetInterval: IntervalPreset;

  get presetInterval(): IntervalPreset {
    return this._presetInterval;
  }

  set presetInterval(value: IntervalPreset) {
    this._presetInterval = value;
  }

  // --------------------------------------------------------

  /**
   * Time in seconds when to automatically update the chart again
   */
  private _updateInterval: UpdateIntervalSeconds;

  get updateInterval(): UpdateIntervalSeconds {
    return this._updateInterval;
  }

  set updateInterval(value: UpdateIntervalSeconds) {
    this._updateInterval = value;
  }

  // --------------------------------------------------------
  // --------------------------------------------------------
  // --------------------------------------------------------

  /**
   * Timeout to wait for possible ngModel change when e.g.toggling autoUpdate state
   */
  public saveToStorage(): void {
    setTimeout(() => localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.toJson())));
  }

  /**
   * Handle possible change of preset.<br/>
   * Adapt start and end time, based on preset. Also Set correct interval.
   */
  public updatePresetValues(): void {
    this.presetInterval.refreshValues();
  }

  /**
   * Convert object to JSON object.<br/>
   * Calls same named method on child objects
   */
  public toJson(): IChartFilterJson {
    return {
      isAutoUpdate: this.isAutoUpdate,
      updateInterval: this.updateInterval,
      preset: this.preset,
      customInterval: this.customInterval.toJson(),
    };
  }

  /**
   * Update object to default filter.<br/>
   * Set all default values. Including sub objects.
   */
  private initializeDefault(): ChartFilter {
    const d = new Date();
    d.setDate(d.getDate() - 1);

    this.isAutoUpdate = false;
    this.updateInterval = 15;
    this.preset = 'last_15_minutes';
    this.presetInterval = IntervalFactory.createPresetInterval(this.preset);
    this.customInterval = IntervalFactory.createCustomInterval();

    return this;
  }
}
