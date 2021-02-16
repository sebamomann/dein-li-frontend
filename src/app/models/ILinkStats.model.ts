import {Call} from './Call';

export interface ILinkStats {
  total: number;
  distinctCalls: number;
  calls: Call[];
  format: string;
}
