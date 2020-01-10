## basic

Number of Logs: **10000**

| Logger       | Time   |
| ------------ | ------ |
| Ogma Regular | 58 ms  |
| Ogma JSON    | 48 ms  |
| Pino         | 26 ms  |
| Winston JSON | 120 ms |
| Bunayn       | 61 ms  |

---

## long

Number of Logs: **10000**

| Logger       | Time   |
| ------------ | ------ |
| Ogma Regular | 130 ms |
| Ogma JSON    | 377 ms |
| Pino         | 355 ms |
| Winston JSON | 396 ms |
| Bunayn       | 399 ms |

---

## json

Number of Logs: **10000**

| Logger       | Time  |
| ------------ | ----- |
| Ogma Regular | 31 ms |
| Ogma JSON    | 41 ms |
| Pino         | 18 ms |
| Winston JSON | 36 ms |
| Bunayn       | 53 ms |

---

## deep

Number of Logs: **10000**

| Logger       | Time   |
| ------------ | ------ |
| Ogma Regular | 302 ms |
| Ogma JSON    | 280 ms |
| Pino         | 175 ms |
| Winston JSON | 315 ms |
| Bunayn       | 203 ms |

---

Benchmarks generated from Linux/linux x64 4.15.0-70-generic ~Intel(R) Core(TM) i3-8130U CPU @ 2.20GHz (cores/threads: 4)
