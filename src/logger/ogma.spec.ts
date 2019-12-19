import { LogLevel } from '../enums';
import { OgmaOptions } from '../interfaces';
import { Ogma } from './ogma';

process.stdout.hasColors = () => true;

const circularObject: any = {};
circularObject.a = 'hello';
circularObject.b = {
  c: circularObject,
};
circularObject.d = () => 'function';

const mockStream = {
  write: (message: any) => jest.fn(() => message),
};

const justSilly: Partial<OgmaOptions> = {
  logLevel: 'SILLY',
};

const noColor: Partial<OgmaOptions> = {
  color: false,
};

const justStream: Partial<OgmaOptions> = {
  stream: mockStream,
};

const jsonLogging: Partial<OgmaOptions> = {
  json: true,
  logLevel: 'ALL',
};

const allOptions: OgmaOptions = {
  logLevel: 'ALL',
  color: true,
  stream: mockStream,
  json: false,
};

describe('Ogma class', () => {
  let ogma: Ogma;
  let stdoutSpy: jest.SpyInstance;

  describe.each([justSilly, noColor, justStream, jsonLogging, allOptions])(
    'Ogma with options %o',
    (options?: Partial<OgmaOptions>) => {
      beforeEach(() => {
        ogma = new Ogma(options);
      });

      describe.each(['message', 42, true, circularObject, () => 'func'])(
        'calling log method with %o',
        (logMessage) => {
          beforeEach(() => {
            if (options?.stream) {
              stdoutSpy = jest
                .spyOn(mockStream, 'write')
                .mockImplementation((message) => message);
            } else {
              stdoutSpy = jest
                .spyOn(process.stdout, 'write')
                .mockImplementation((message: any) => message);
            }
          });

          afterEach(() => {
            stdoutSpy.mockReset();
          });
          it.each([
            'SILLY',
            'VERBOSE',
            'FINE',
            'DEBUG',
            'INFO',
            'LOG',
            'WARN',
            'ERROR',
            'FATAL',
          ])('should call %s and all above it', (level: string) => {
            if (
              LogLevel[level as keyof typeof LogLevel] >=
              LogLevel[options?.logLevel || 'INFO']
            ) {
              (ogma as any)[level.toLowerCase()](logMessage);
              if (typeof logMessage === 'object') {
                expect(stdoutSpy).toBeCalledTimes(1);
                expect(
                  stdoutSpy.mock.calls[0][0].includes('[Circular]'),
                ).toBeTruthy();
              } else {
                expect(stdoutSpy).toBeCalledTimes(1);
              }
              let containString: string;
              if (options?.color && !options.json) {
                containString = `m${(
                  '[' +
                  LogLevel[(LogLevel as any)[level]] +
                  ']'
                ).padEnd(7)}\u001b[0m`;
              } else if (!options?.json) {
                containString = `${(
                  '[' +
                  LogLevel[(LogLevel as any)[level]] +
                  ']'
                ).padEnd(7)}`;
              } else {
                containString =
                  '"level":"' + LogLevel[(LogLevel as any)[level]] + '"';
              }
              expect(
                stdoutSpy.mock.calls[0][0].includes(containString),
              ).toBeTruthy();
            } else {
              expect(stdoutSpy).toBeCalledTimes(0);
            }
          });
        },
      );
    },
  );
  describe('printError', () => {
    beforeEach(() => {
      ogma = new Ogma();
      stdoutSpy = jest
        .spyOn(process.stdout, 'write')
        .mockImplementation((message) => message as any);
    });

    afterEach(() => {
      stdoutSpy.mockReset();
    });

    it('should make three prints', () => {
      ogma.printError(new Error('This is my error'));
      expect(stdoutSpy).toBeCalledTimes(2);
      expect(stdoutSpy.mock.calls[0][0].includes('Error')).toBeTruthy();
      expect(
        stdoutSpy.mock.calls[1][0].includes('This is my error'),
      ).toBeTruthy();
    });
  });

  describe('Bad log level', () => {
    beforeEach(() => {
      stdoutSpy = jest
        .spyOn(process.stdout, 'write')
        .mockImplementation((message) => message as any);
    });

    afterEach(() => {
      stdoutSpy.mockReset();
    });

    it('should replace bad with "INFO"', () => {
      ogma = new Ogma({ logLevel: 'bad' as any });
      expect((ogma as any).options.logLevel).toBe('INFO');
      expect(stdoutSpy).toBeCalledTimes(1);
    });

    it('should run the if with options but no logLevel', () => {
      ogma = new Ogma({ color: false });
      expect(stdoutSpy).toBeCalledTimes(0);
    });
  });
});
