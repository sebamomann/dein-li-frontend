import {IHtmlOption} from './IHtmlOption';

export class HtmlOption implements IHtmlOption {
  private _text: string;

  get text(): string {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
  }

  private _value: string;

  get value(): string {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
  }
}
