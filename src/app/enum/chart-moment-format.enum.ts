export class ChartMomentFormat {
  static readonly minutes = new ChartMomentFormat('minutes', 'YYYY-MM-DDTHH:mm', 'HH:mm', 'minutes');
  static readonly hours = new ChartMomentFormat('hours', 'YYYY-MM-DDTHH', 'HH[Uhr]', 'hours');
  static readonly days = new ChartMomentFormat('days', 'YYYY-MM-DD', 'DD. MMM', 'days');
  static readonly months = new ChartMomentFormat('months', 'YYYY-MM', 'MM; YY', 'months');

  private constructor(private readonly key: string, public readonly format: string, public readonly labelFormat: string,
                      public readonly  momentInterval: any) {
  }

  toString() {
    return this.key;
  }
}
