import {IShareObject} from './IShareObject';

export class ShareObject implements IShareObject {
  constructor() {
  }

  private _text: string = 'dein.li Kurzlink' + ' - ' + 'Hier, für dich: ';

  get text(): string {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
  }

  private _title = 'dein.li Kurzlink';

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  private _url: string;

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }
}
