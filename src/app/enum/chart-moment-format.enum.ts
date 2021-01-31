import {ElementInterval} from '../models/ElementInterval.type';
import {HtmlOption} from '../models/HtmlOption';

export class ChartMomentFormat {

  static readonly minutes = new ChartMomentFormat('minutes', 'YYYY-MM-DDTHH:mm', 'HH:mm', 'minutes', 1, 'Minuten');
  static readonly hours = new ChartMomentFormat('hours', 'YYYY-MM-DDTHH', 'HH[Uhr]', 'hours', 2, 'Stunden');
  static readonly days = new ChartMomentFormat('days', 'YYYY-MM-DD', 'DD. MMM', 'days', 3, 'Tage');
  static readonly months = new ChartMomentFormat('months', 'YYYY-MM', 'MM; YY', 'months', 4, 'Monate');

  private constructor(private readonly key: string, public readonly format: string, public readonly labelFormat: string,
                      public readonly  momentInterval: ElementInterval, public index: number, public label: string) {
  }

  public static getElementsBiggerThan(minimumPossibleInterval: ChartMomentFormat): ChartMomentFormat[] {
    const output = [];

    Object.keys(this).forEach((key) => {
      const elem = ChartMomentFormat[key];
      if (elem.index >= minimumPossibleInterval.index) {
        output.push(elem);
      }
    });

    return output;
  }

  public static getOptionArray(elements: ChartMomentFormat[]): HtmlOption[] {
    const output = [];

    elements.forEach((element) => {
      const option = new HtmlOption();
      option.text = element.label;
      option.value = element.key;

      output.push(option);
    });

    return output;
  }

  toString() {
    return this.key;
  }

  public hasLowerIntervalThan(compare: ChartMomentFormat) {
    return this.index < compare.index;
  }
}
