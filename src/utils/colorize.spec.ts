import { Color } from '../enums';
import { OgmaSimpleType } from '../types';
import { colorize } from './colorize';

const ESC = '\u001B';

describe.each([
  [{ processColor: true, useColor: true }],
  [{ processColor: true, useColor: false }],
  [{ processColor: false, useColor: true }],
  [{ processColor: false, useColor: false }],
])('colorize %j', (options) => {
  describe.each([
    ['red', Color.RED],
    ['green', Color.GREEN],
    ['yellow', Color.YELLOW],
    ['blue', Color.BLUE],
    ['magenta', Color.MAGENTA],
    ['cyan', Color.CYAN],
    ['white', Color.WHITE],
  ])('print in %s', (colorName, colorEnum) => {
    it.each(['hello', 42, true])('print %o', (value: OgmaSimpleType) => {
      process.stdout.hasColors = () => options.processColor;
      const retVal = colorize(value, colorEnum as Color, options.useColor);
      if (!options.useColor || !options.processColor) {
        expect(retVal).toBe(value.toString());
      } else {
        expect(retVal).toBe(ESC + '[3' + colorEnum + 'm' + value + ESC + '[0m');
        expect(/^\u001b\[3\d{1}m\w{2,5}\u001b\[0m$/.test(retVal)).toBeTruthy();
      }
    });
  });
});
describe('colorize defaults', () => {
  it('should print with defaults', () => {
    (process as any) = undefined;
    expect(colorize('hello')).toBe('hello');
  });
});
