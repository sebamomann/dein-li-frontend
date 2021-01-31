// @ts-ignore
import moment from 'moment';
import {IChartFilter} from './IChartFilter';
import {UpdateIntervalPreset} from './UpdateIntervalPreset.type';
import {UpdateIntervalSeconds} from './UpdateIntervalSeconds.type';
import {Interval} from './Interval.class';

moment.locale('de');

export class ChartFilter implements IChartFilter {
  private LOCAL_STORAGE_KEY = 'chartFilter';

  constructor() {
    try {
      const storageData: IChartFilter = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY));
      if (!storageData) {
        this.initializeDefault();
      } else {
        Object.assign(this, storageData);
        this.customInterval = Object.assign(new Interval(), storageData.customInterval);
        this.presetInterval = Object.assign(new Interval(), storageData.presetInterval);
      }
    } catch {
      this.initializeDefault();
    }
  }

  private _customInterval: Interval;

  get customInterval(): Interval {
    return this._customInterval;
  }

  set customInterval(value: Interval) {
    this._customInterval = value;
  }

  private _isAutoUpdate: boolean;

  get isAutoUpdate(): boolean {
    return this._isAutoUpdate;
  }

  set isAutoUpdate(value: boolean) {
    this._isAutoUpdate = value;
  }

  private _preset: UpdateIntervalPreset;

  get preset(): UpdateIntervalPreset {
    return this._preset;
  }

  set preset(value: UpdateIntervalPreset) {
    this._preset = value;
  }

  private _presetInterval: Interval;

  get presetInterval(): Interval {
    return this._presetInterval;
  }

  set presetInterval(value: Interval) {
    this._presetInterval = value;
  }

  private _updateInterval: UpdateIntervalSeconds;

  get updateInterval(): UpdateIntervalSeconds {
    return this._updateInterval;
  }

  set updateInterval(value: UpdateIntervalSeconds) {
    this._updateInterval = value;
  }

  /**
   * Save current object as a appropriate format into localStorage.<br/>
   */
  public saveToStorage() {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.toJson()));
  }

  /**
   * Convert object to JSON object
   */
  public toJson(): IChartFilter {
    return {
      isAutoUpdate: this.isAutoUpdate,
      updateInterval: this.updateInterval,
      preset: this.preset,
      presetInterval: this.presetInterval.toJson(),
      customInterval: this.customInterval.toJson(),
    };
  }

  /**
   * Handle possible change of preset.<br/>
   * Adapt start and end time, based on preset. Also Set correct interval.
   */
  public updatePresetValues(): void {
    const date = moment();
    this.presetInterval.end = date.format('YYYY-MM-DDTHH:mm');

    if (this.preset === 'last_15_minutes') {
      this.presetInterval.start = date.subtract(15, 'minutes').format('YYYY-MM-DDTHH:mm');
      this.presetInterval.elementInterval = 'minutes';
    } else if (this.preset === 'last_hour') {
      this.presetInterval.start = date.subtract(1, 'hours').format('YYYY-MM-DDTHH:mm');
      this.presetInterval.elementInterval = 'minutes';
    } else if (this.preset === 'last_12_hours') {
      this.presetInterval.start = date.subtract(12, 'hours').format('YYYY-MM-DDTHH:mm');
      this.presetInterval.elementInterval = 'hours';
    } else if (this.preset === 'last_day') {
      this.presetInterval.start = date.subtract(24, 'hours').format('YYYY-MM-DDTHH:mm');
      this.presetInterval.elementInterval = 'hours';
    }
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
    this.presetInterval = new Interval().initializeDefault(); // TODO FACTORY
    this.customInterval = new Interval().initializeDefault(); // TODO FACTORY

    return this;
  }
}
