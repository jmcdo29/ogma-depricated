import { LogLevel } from '../enums';

export interface OgmaOptions {
  logLevel: keyof typeof LogLevel;
  color: boolean;
  stream: { write: (args: any) => void };
  json: boolean;
}

export const OgmaDefaults: OgmaOptions = {
  logLevel: 'INFO',
  color: true,
  stream: process.stdout,
  json: false,
};
