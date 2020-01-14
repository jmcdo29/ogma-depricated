import { readFile } from 'fs';
import { promisify } from 'util';
import { Color, LogLevel } from '../enums';
import { OgmaLog } from '../interfaces/ogma-log';
import { colorize } from '../utils/colorize';

const readPromise = promisify(readFile);

const standardKeys = ['time', 'pid', 'level'];

function getMessage(log: OgmaLog): string {
  return log.message as string;
}

function getMessageFromJSON(log: { [key: string]: any }): string {
  return JSON.stringify(log);
}

function wrapInParens(message: string): string {
  return '[' + message + ']';
}

function isOgmaFormat(log: object): log is OgmaLog {
  return standardKeys.every((key) =>
    Object.prototype.hasOwnProperty.call(log, key),
  );
}

function getLevel(level: keyof typeof LogLevel, useColor: boolean): string {
  let retString = wrapInParens(level).padEnd(7, ' ');
  if (useColor) {
    switch (level) {
      case 'ALL':
      case 'SILLY':
        retString = colorize(retString, Color.MAGENTA);
        break;
      case 'FINE':
      case 'VERBOSE':
        retString = colorize(retString, Color.GREEN);
        break;
      case 'DEBUG':
        retString = colorize(retString, Color.BLUE);
        break;
      case 'INFO':
      case 'LOG':
        retString = colorize(retString, Color.CYAN);
        break;
      case 'WARN':
        retString = colorize(retString, Color.YELLOW);
        break;
      case 'ERROR':
      case 'FATAL':
        retString = colorize(retString, Color.RED);
        break;
    }
  }
  return retString;
}

async function rehydrate(
  fileName: string,
  useColor: boolean = process.stdout.isTTY,
) {
  let context;
  try {
    context = (await readPromise(fileName)).toString();
  } catch (err) {
    process.stdout.write('There was an error reading the file.');
    process.stderr.write(err);
    process.exit(1);
  }
  const logs = context.split('\n').filter((log) => log);
  if (!logs.every((log) => isOgmaFormat(JSON.parse(log)))) {
    process.stderr.write(
      'The log file provided is not in Ogma format. Please try another log file.',
    );
    process.exit(1);
  }
  logs
    .map((log) => JSON.parse(log))
    .forEach((log: OgmaLog) => {
      const { time, application, context, pid, level, ...rest } = log;
      let message: string | object;
      if (rest.message) {
        message = getMessage(log);
      } else {
        message = getMessageFromJSON(rest);
      }
      let logMessage = wrapInParens(time) + ' ';
      if (application) {
        logMessage += colorize(wrapInParens(application), Color.YELLOW) + ' ';
      }
      logMessage += pid + ' ';
      if (context) {
        logMessage += colorize(wrapInParens(context), Color.CYAN) + ' ';
      }
      logMessage += getLevel(level, useColor);
      logMessage += '| ';
      logMessage += message + '\n';
      process.stdout.write(Buffer.from(logMessage));
    });
}

export async function ogma(args: string[]): Promise<void> {
  if (!process.argv[2]) {
    process.stderr.write('Log file to rehydrate must be specified.');
    process.exit(1);
  }
  [, , ...args] = args;
  if (args.length === 1) {
    await rehydrate(args[0]);
  } else if (args.some((arg) => arg.includes('--'))) {
    const flag = args.find((arg) => arg.includes('--')) as string;
    const file = args[args.length - args.indexOf(flag) - 1];
    const useColor = JSON.parse(flag.split('=')[1]) ?? process.stdout.isTTY;
    await rehydrate(file, useColor);
  }
}
