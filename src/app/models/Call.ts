import {ICall} from './ICall';

export class Call implements ICall {
  count: number;
  iat: string;

  constructor(count: number, iat: string) {
    this.count = count;
    this.iat = iat;
  }
}
