<p align="center">
  [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=jmcdo29_ogma&metric=alert_status)](https://sonarcloud.io/dashboard?id=jmcdo29_ogma)[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![Actions Status](https://github.com/jmcdo29/ogma/workflows/CI/badge.svg)]
</p>

# Ogma

Beautifully simple logging.

## Why

Really just because I wanted to. Feel free to use whatever logger you want, [Winston](https://www.npmjs.com/package/winston), [pino](https://www.npmjs.com/package/pino), [bunyan](https://www.npmjs.com/package/bunyan), or anything else. This is just how I wanted my logs to look.

## Okay, but why Ogma?

Name of the Celtic god of Wisdom and Eloquence. As I think these logs both look pretty and tell good information, I figured I would go with the name

## Use

### Logging

To use Ogma, first you'll need to instantiate an instance of the Ogma class. You can pass in options to override the default if you would like as well. (options defined below). Ogma has eight different logging levels:

- OFF: No logs are displayed through Ogma. `console.log` will still work
- SILLY: For when you just want to type fun stuff but don't really want people to see it (usually). Colored with Magenta
- VERBOSE: great for long strings of errors and things going on. Colored with Green
- DEBUG: Just like the name implies, debugging! Colored with Blue
- INFO: For normal logging, nothing special here. Colored with Cyan.
- WARN: For errors about things that _may_ be a problem. Colored with Yellow.
- ERROR: For errors about things that _are_ a problem. Colored with Red.
- FATAL: Yeah, you should call someone at 3AM if this log ever shows up. Colored with Red.

When discussing log levels, Ogma will print at the level provided and anything under the level as shown above, so if 'SILLY' is set, all logs will be show; if 'WARN' is set as the logLevel, only 'WARN', 'ERROR', and 'FATAL' logs will be shown. The only exclusion to this rule if 'OFF', which prints nothing through Ogma.

When colors are enabled, the color mentioned above will be the color the level string is printed in.

There is also the `printError` method on the `Ogma` class thta takes care of printing the error's name under the ERROR level, the message under the WARN level, and the stack trace under the VERBOSE level.

> Note: INFO is also aliased as LOG so `ogma.log()` works just like `ogma.info()`, but the log level will stay as "INFO" in both cases. The same goes for "VERBOSE" and "FINE" with "FINE" being the log level printed (for the sake of being concise). Lastly, 'ALL' can be used for all logs. This is the same as setting `logLevel` to 'SILLY'.

#### Ogma Options

| name | type | use |
| --- | --- | --- |
| logLevel | one of the above log levels (default: INFO) | for determining this instance of Ogma's log level |
| color | boolean (default: true) | determine if color should attempt to be used. NOTE: Color will not be used if the current terminal does not support it |
| stream | { write: (message: any) => void } (default: process.stdout) | the output mechanism used to know how to write logs |

#### Using Files instead of a console

> Note: most files don't easily work with colors, so the color option should be passed as `false`

If you want to use a file to hold your logs instead of a console/terminal/bash you can pass in a stream of your own to the options like so:

```ts
import { appendFile } from 'fs';
import { Ogma } from 'ogma';

const fileWriter = new Ogma({
  stream: {
    write: (message: any): void => {
      appendFile('server.log', message, (err) => {
        if (err) {
          throw err;
        }
      });
    }
  }
});

fileWriter.log('Logging to File');
```

### Applying color to Text

No console logging package is complete without color, and because of that `Ogma` exports some utility methods for wrapping text in color, so long as your terminal of choice supports 3/4-bit color. You can find the the color reference in the screenshot below.

To make use of the utility functions you'll need to import the `color` method and pass in your string to the desired color like so:

```ts
import { color } from 'ogma';

color.blue('This will be blue');
// returns '\u001b[34mThis will be blue\u001b[0m'
```

This will wrap the string `"This will be blue"` in the expected escape sequence and color value as well as reset the color afterwards so no other strings are affected.

### Example of what the logs look like

I said the logs were beautiful, and to me they absolutely are. Each log is matched with a timestamp in ISO format, the log level, a pipe character, and then the message, for easier searching if needed. If a JSON is passed to Ogma, a new line will separate the JSON and the original log line, but the timestamp and level will not be duplicated. Ogma also will print `'[Function]'` if a function is found or `'[Circular]'` is a circular reference is found.

```shell
# ogma.log('hello')
[2019-12-11T22:54:58.462Z] [INFO] | hello

# ogma.log({a: () => 'hello', b: {c: 'nested'}, d: this});
[2019-12-11T22:56:02.502Z] [INFO] |
{
  "a": "[Function]",
  "b": {
    "c": "nested"
  },
  "d": {
    "global": "[Circular]",
    "clearInterval": "[Function]",
    "clearTimeout": "[Function]",
    "setInterval": "[Function]",
    "setTimeout": "[Function]",
    "queueMicrotask": "[Function]",
    "clearImmediate": "[Function]",
    "setImmediate": "[Function]",
    "__extends": "[Function]",
    "__assign": "[Function]",
    "__rest": "[Function]",
    "__decorate": "[Function]",
    "__param": "[Function]",
    "__metadata": "[Function]",
    "__awaiter": "[Function]",
    "__generator": "[Function]",
    "__exportStar": "[Function]",
    "__values": "[Function]",
    "__read": "[Function]",
    "__spread": "[Function]",
    "__spreadArrays": "[Function]",
    "__await": "[Function]",
    "__asyncGenerator": "[Function]",
    "__asyncDelegator": "[Function]",
    "__asyncValues": "[Function]",
    "__makeTemplateObject": "[Function]",
    "__importStar": "[Function]",
    "__importDefault": "[Function]"
  }
}
```

### Example from Command Line

![](Ogma-log.png)
