const ESC = '\x1B';
const RESET = '[0m';

export function colorize(
  value: string,
  color:
    | 'red'
    | 'green'
    | 'yellow'
    | 'blue'
    | 'magenta'
    | 'cyan'
    | 'white' = 'white',
): string {
  if (isNotProduction()) {
    let colorString;
    switch (color) {
      case 'red':
        colorString = '31';
        break;
      case 'green':
        colorString = '32';
        break;
      case 'yellow':
        colorString = '33';
        break;
      case 'blue':
        colorString = '34';
        break;
      case 'magenta':
        colorString = '35';
        break;
      case 'cyan':
        colorString = '36';
        break;
      case 'white':
      default:
        colorString = '37';
        break;
    }
    value = ESC + '[' + colorString + 'm' + value + ESC + RESET;
  }
  return value;
}

function isNotProduction(): boolean {
  return (
    process.env.NODE_ENV?.toLowerCase() === 'prod' &&
    process.env.NODE_ENV?.toLowerCase() === 'production'
  );
}
