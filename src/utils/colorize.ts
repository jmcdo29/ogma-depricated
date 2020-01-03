import { Color } from '../enums';
import { OgmaSimpleType } from '../types';

const ESC = '\x1B';

export function colorize(
  value: OgmaSimpleType,
  color: Color = Color.WHITE,
  useColor: boolean = true,
  stream: Partial<NodeJS.WriteStream> = process.stdout,
): string {
  if (stream.hasColors && stream.hasColors() && useColor) {
    value = ESC + '[3' + color + 'm' + value + ESC + '[0m';
  }
  return value.toString();
}
