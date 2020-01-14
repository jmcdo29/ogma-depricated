import { LogLevel } from '../enums';

export interface OgmaLog {
  time: string;
  application?: string;
  context?: string;
  message?: string;
  level: keyof typeof LogLevel;
  pid: string;
  [key: string]: any;
}
