import { Color } from '../enums';

const ESC = '\x1B';

export function colorize(
  value: string,
  color: Color = Color.WHITE,
  useColor: boolean = true,
): string {
  if (process.stdout.hasColors() && useColor) {
    value = ESC + '[3' + color + 'm' + value + ESC + '[0m';
  }
  return value;
}
