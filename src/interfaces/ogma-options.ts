import { LogLevel } from '../enums';

export interface OgmaOptions {
  logLevel: keyof typeof LogLevel;
  color: boolean;
  stream: Partial<NodeJS.WriteStream> &
    Pick<NodeJS.WriteStream, 'write' | 'hasColors'>;
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
