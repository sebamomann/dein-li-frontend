export interface IChartFilter {
  start: Date;
  end: Date;
  interval: 'minutes' | 'hours' | 'days' | 'months';
}
