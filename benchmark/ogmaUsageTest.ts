import * as bunyan from 'bunyan';
import { randomBytes } from 'crypto';
import { createWriteStream } from 'fs';
import * as os from 'os';
import * as pino from 'pino';
import * as winston from 'winston';
import { color, Ogma } from '../dist';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const printDeep = require('../package.json');

const dest = createWriteStream('/dev/null');
const benchmarkDest = createWriteStream('./benchmark/benchmark.md');

const ogmaFile = new Ogma({
  stream: dest,
  application: 'Benchmark',
  context: 'regular',
});

const ogmaJsonFile = new Ogma({
  stream: dest,
  json: true,
  application: 'Benchmark',
  context: 'json',
});

const pinoFile = pino(
  {
    name: 'Benchmark',
  },
  dest,
);

const winstonJsonFile = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: new winston.transports.Stream({ stream: dest }),
});

const bunyanFile = bunyan.createLogger({
  name: 'Benchmark',
  streams: [
    {
      level: 'trace',
      stream: dest,
    },
  ],
});

function timeIt(
  message: any,
  logger: { info: (message: any) => void },
  time: number,
): string {
  const startTime = Date.now();
  for (let i = 0; i < time; i++) {
    logger.info(message);
  }
  return Date.now() - startTime + ' ms';
}

function writeResults(
  test: string,
  numberOfPrints: number,
  ogmaTime: string,
  ogmaJsonTime: string,
  pinoTime: string,
  winstonJsonTime: string,
  bunyanTime: string,
): void {
  benchmarkDest.write(`## ${test}

Number of Logs: __${numberOfPrints}__

| Logger | Time |
| - | - |
| Ogma Regular | ${ogmaTime} |
| Ogma JSON | ${ogmaJsonTime} |
| Pino | ${pinoTime} |
| Winston JSON | ${winstonJsonTime} |
| Bunayn | ${bunyanTime} |

---

`);
}

function benchmark(
  print: any,
  type: 'basic' | 'json' | 'long' | 'deep',
  times: number,
): void {
  const ogmaTime = timeIt(print, ogmaFile, times);
  const ogmaJsonTime = timeIt(print, ogmaJsonFile, times);
  const pinoTime = timeIt(print, pinoFile, times);
  const winstonJsonTime = timeIt(print, winstonJsonFile, times);
  const bunyanTime = timeIt(print, bunyanFile, times);
  writeResults(
    type,
    times,
    ogmaTime,
    ogmaJsonTime,
    pinoTime,
    winstonJsonTime,
    bunyanTime,
  );
}

function benchmarkAll(times: number): void {
  benchmark('hello world', 'basic', times);
  benchmark(randomBytes(2000).toString(), 'long', times);
  benchmark({ hello: 'world' }, 'json', times);
  benchmark(printDeep, 'deep', times);
}

function benchmarkUsage(): void {
  process.stdout.write(`
The benchmark function should be used with an argument. The arguments can be as follows:

    1) ${color.blue('basic')}
    2) ${color.cyan('long')}
    3) ${color.green('json')}
    4) ${color.yellow('deep')}
    5) ${color.magenta('all')}

Please use one of the following when running the benchmarks.`);
}

function closeStream(): void {
  benchmarkDest.write(`
Benchmarks generated from ${os.type()}/${os.platform()} ${os.arch()} ${os.release()} ~${
    os.cpus()[0].model
  } (cores/threads: ${os.cpus().length})
`);
}

if (!process.argv[2]) {
  benchmarkUsage();
  process.exit(0);
}

const numberOfTimes = Number.parseInt(process.argv[3], 10) || 10000;

switch (process.argv[2]) {
  case 'basic':
    benchmark('hello world', 'basic', numberOfTimes);
    closeStream();
    break;
  case 'long':
    benchmark(randomBytes(2000).toString(), 'long', numberOfTimes);
    closeStream();
    break;
  case 'json':
    benchmark({ hello: 'world' }, 'json', numberOfTimes);
    closeStream();
    break;
  case 'deep':
    benchmark(
      Object.assign({}, printDeep, { deep: true }),
      'deep',
      numberOfTimes,
    );
    closeStream();
    break;
  case 'all':
    benchmarkAll(numberOfTimes);
    closeStream();
    break;
}
