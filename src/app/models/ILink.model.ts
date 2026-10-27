export interface ILink {
  id: string;
  original: string;
  short: string;
  iat: Date;
  direct?: boolean;
  openDirectly?: boolean;
}
