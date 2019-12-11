import { colorize } from './colors';

export const color = {
  /**
   * Print your text in red. Send in a string and the output will be red.
   *
   * @param {string} value the string you want to print in red
   */
  red: (value: string) => colorize(value, 'red'),
  /**
   * Print your text in green. Send in a string and the output will be green.
   *
   * @param {string} value the string you want to print in green.
   */
  green: (value: string) => colorize(value, 'green'),
  /**
   * Print your text in yellow. Send in a string and the output will be yellow.
   *
   * @param {string} value the string you want to print in yellow.
   */
  yellow: (value: string) => colorize(value, 'yellow'),
  /**
   * Print your text in blue. Send in a string and the output will be blue.
   *
   * @param {string} value the string you want to print in blue.
   */
  blue: (value: string) => colorize(value, 'blue'),
  /**
   * Print your text in magenta. Send in a string and the output will be magenta.
   *
   * @param {string} value the string you want to print in magenta.
   */
  magenta: (value: string) => colorize(value, 'magenta'),
  /**
   * Print your text in cyan. Send in a string and the output will be cyan.
   *
   * @param {string} value the string you want to print in cyan.
   */
  cyan: (value: string) => colorize(value, 'cyan'),
  /**
   * Print your text in white. Send in a string and the output will be white.
   *
   * @param {string} value the string you want to print in white.
   */
  white: (value: string) => colorize(value, 'white'),
};
