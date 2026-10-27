export interface IAccount {
  id: string;
  username: string;
  email: string;
  trusted: boolean;
  trustedAt: Date;
  directForAll: boolean;
  iat: Date;
  lastSeen: Date;
  admin?: boolean;
}
