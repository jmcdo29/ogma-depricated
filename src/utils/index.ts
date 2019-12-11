import { Color } from '../enums';
import { colorize } from './colorize';

export const color = {
  /**
   * Print your text in red. Send in a string and the output will be red.
   *
   * @param {string} value the string you want to print in red
   */
  red: (value: string) => colorize(value, Color.RED),
  /**
   * Print your text in green. Send in a string and the output will be green.
   *
   * @param {string} value the string you want to print in green.
   */
  green: (value: string) => colorize(value, Color.GREEN),
  /**
   * Print your text in yellow. Send in a string and the output will be yellow.
   *
   * @param {string} value the string you want to print in yellow.
   */
  yellow: (value: string) => colorize(value, Color.YELLOW),
  /**
   * Print your text in blue. Send in a string and the output will be blue.
   *
   * @param {string} value the string you want to print in blue.
   */
  blue: (value: string) => colorize(value, Color.BLUE),
  /**
   * Print your text in magenta. Send in a string and the output will be magenta.
   *
   * @param {string} value the string you want to print in magenta.
   */
  magenta: (value: string) => colorize(value, Color.MAGENTA),
  /**
   * Print your text in cyan. Send in a string and the output will be cyan.
   *
   * @param {string} value the string you want to print in cyan.
   */
  cyan: (value: string) => colorize(value, Color.CYAN),
  /**
   * Print your text in white. Send in a string and the output will be white.
   *
   * @param {string} value the string you want to print in white.
   */
  white: (value: string) => colorize(value, Color.WHITE),
};
