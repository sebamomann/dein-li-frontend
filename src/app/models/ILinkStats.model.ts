import {ICall} from './ICall';

export interface ILinkStats {
  total: number;
  distinctCalls: number;
  calls: ICall[];
  format: string;
}
