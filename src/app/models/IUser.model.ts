import {ISession} from './ISession.model';

export interface IUser {
  id: string;
  username: string;
  password?: string;
  mail: string;
  session: ISession;
}
