import { Color, LogLevel } from '../enums';
import { OgmaDefaults, OgmaOptions } from '../interfaces/ogma-options';
import { colorize } from '../utils/colorize';

export class Ogma {
  private options: OgmaOptions;

  public fine = this.verbose;
  public log = this.info;

  constructor(options?: Partial<OgmaOptions>) {
    this.options = { ...OgmaDefaults, ...options };
    this.options.logLevel = this.options.logLevel.toUpperCase() as keyof typeof LogLevel;
  }

  private printMessage(
    level: LogLevel,
    formattedLevel: string,
    message: any,
  ): void {
    const dateString = '[' + new Date().toISOString() + ']';
    if (level < LogLevel[this.options.logLevel]) {
      return;
    }
    if (message && typeof message === 'object') {
      this.options.stream.write(`${dateString} ${formattedLevel}|\n`);
      this.options.stream.write(
        JSON.stringify(message, this.circularReplacer(), 2),
      );
      this.options.stream.write('\n');
    } else {
      this.options.stream.write(
        `${dateString} ${formattedLevel}| ${message}\n`,
      );
    }
  }

  private circularReplacer(): (key: string, value: any) => string {
    const seen = new WeakSet();
    return (key: string, value: any): string => {
      if (typeof value === 'function') {
        return '[Function]';
      }
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return '[Circular]';
        }
        seen.add(value);
      }
      return value;
    };
  }

  private toColor(level: LogLevel, color: Color): string {
    const levelString = ('[' + LogLevel[level] + ']').padEnd(7);
    return colorize(levelString, color, this.options.color);
  }

  public silly(message: any): void {
    this.printMessage(
      LogLevel.SILLY,
      this.toColor(LogLevel.SILLY, Color.MAGENTA),
      message,
    );
  }

  public verbose(message: any): void {
    this.printMessage(
      LogLevel.VERBOSE,
      this.toColor(LogLevel.VERBOSE, Color.GREEN),
      message,
    );
  }

  public debug(message: any): void {
    this.printMessage(
      LogLevel.DEBUG,
      this.toColor(LogLevel.DEBUG, Color.BLUE),
      message,
    );
  }

  public info(message: any): void {
    this.printMessage(
      LogLevel.INFO,
      this.toColor(LogLevel.INFO, Color.CYAN),
      message,
    );
  }

  public warn(message: any): void {
    this.printMessage(
      LogLevel.WARN,
      this.toColor(LogLevel.WARN, Color.YELLOW),
      message,
    );
  }

  public error(message: any): void {
    this.printMessage(
      LogLevel.ERROR,
      this.toColor(LogLevel.ERROR, Color.RED),
      message,
    );
  }

  public fatal(message: any): void {
    this.printMessage(
      LogLevel.FATAL,
      this.toColor(LogLevel.FATAL, Color.RED),
      message,
    );
  }

  public printError(error: Error): void {
    this.error(error.name);
    this.warn(error.message);
    this.verbose('\n' + error.stack);
  }
}
