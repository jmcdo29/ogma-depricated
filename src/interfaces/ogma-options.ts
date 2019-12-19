import { LogLevel } from '../enums';

export interface OgmaOptions {
  logLevel: keyof typeof LogLevel;
  color: boolean;
  stream: { write: (args: any) => void };
  json: boolean;
  context: string;
  application: string;
  [index: string]: any;
}

export const OgmaDefaults: OgmaOptions = {
  logLevel: 'INFO',
  color: true,
  stream: process.stdout,
  json: false,
  context: '',
  application: '',
};
