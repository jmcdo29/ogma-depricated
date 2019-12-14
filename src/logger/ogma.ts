import { Color, LogLevel } from '../enums';
import { OgmaDefaults, OgmaOptions } from '../interfaces';
import { colorize } from '../utils/colorize';

export class Ogma {
  private options: OgmaOptions;

  public fine = this.verbose;
  public log = this.info;

  /**
   * Ogma constructor. Creates a new instance of Ogma
   *
   * @param options Partial of OgmaOptions which you want to use for your Ogma instance.
   * Options include:
   *
   * * logLevel: The level of logs you want to show. Passed as a string
   * * color: `true` if you want color, `false` if you don't. If your terminal does not allow color, this option will be ignored
   * * stream: an object with a `write(message: any) => void` property. Useful if you want to log to a file instead of the console
   */
  constructor(options?: Partial<OgmaOptions>) {
    if (options?.logLevel) {
      options.logLevel = options.logLevel.toUpperCase() as keyof typeof LogLevel;
    }
    this.options = { ...OgmaDefaults, ...options };
    if (options?.logLevel && LogLevel[options.logLevel] === undefined) {
      this.options.logLevel = OgmaDefaults.logLevel;
      this.warn(
        `Ogma logLevel was set to ${options.logLevel} which does not match a defined logLevel. Falling back to default instead.`,
      );
    }
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

  /**
   * Silly log level. Prints SILLY in purple when color is enabled
   *
   * @param message the message to print out. Can also be a JSON object
   */
  public silly(message: any): void {
    this.printMessage(
      LogLevel.SILLY,
      this.toColor(LogLevel.SILLY, Color.MAGENTA),
      message,
    );
  }

  /**
   * Verbose log level. Prints FINE in green when color is enabled
   *
   * @param message the message to print out. Can also be a JSON object
   */
  public verbose(message: any): void {
    this.printMessage(
      LogLevel.VERBOSE,
      this.toColor(LogLevel.VERBOSE, Color.GREEN),
      message,
    );
  }

  /**
   * Debug log level. Prints DEBUG in blue when color is enabled
   *
   * @param message the message to print out. Can also be a JSON object
   */
  public debug(message: any): void {
    this.printMessage(
      LogLevel.DEBUG,
      this.toColor(LogLevel.DEBUG, Color.BLUE),
      message,
    );
  }

  /**
   * Info log level. Prints INFO in cyan when color is enabled.
   *
   * @param message the message to print out. Can also be a JSON object
   */
  public info(message: any): void {
    this.printMessage(
      LogLevel.INFO,
      this.toColor(LogLevel.INFO, Color.CYAN),
      message,
    );
  }

  /**
   * Warn log level. Prints WARN in yellow when color is enabled.
   * @param message the message to print out. Can also be a JSON object
   */
  public warn(message: any): void {
    this.printMessage(
      LogLevel.WARN,
      this.toColor(LogLevel.WARN, Color.YELLOW),
      message,
    );
  }

  /**
   * Error log level. Prints ERROR in red when color is enabled.
   *
   * @param message the message to print out. Can also be a JSON object
   */
  public error(message: any): void {
    this.printMessage(
      LogLevel.ERROR,
      this.toColor(LogLevel.ERROR, Color.RED),
      message,
    );
  }

  /**
   * Fatal log level. Prints FATAL in red when color is enabled.
   *
   * @param message the message to print out. Can also be a JSON object
   */
  public fatal(message: any): void {
    this.printMessage(
      LogLevel.FATAL,
      this.toColor(LogLevel.FATAL, Color.RED),
      message,
    );
  }

  /**
   * Error printing utility method. Made to make things easier
   *
   * @param error The error that is to be printed. The name, message, and stack trace will be printed
   * at the Error, Warn, and Verbose log level respectively
   */
  public printError(error: Error): void {
    this.error(error.name);
    this.warn(error.message);
    this.verbose('\n' + error.stack);
  }
}
