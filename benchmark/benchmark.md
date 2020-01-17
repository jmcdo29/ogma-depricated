## basic

Number of Logs: **10000**

| Logger       | Time   |
| ------------ | ------ |
| Ogma Regular | 47 ms  |
| Ogma JSON    | 45 ms  |
| Pino         | 22 ms  |
| Winston JSON | 115 ms |
| Bunayn       | 65 ms  |

---

## long

Number of Logs: **10000**

| Logger       | Time   |
| ------------ | ------ |
| Ogma Regular | 129 ms |
| Ogma JSON    | 370 ms |
| Pino         | 341 ms |
| Winston JSON | 398 ms |
| Bunayn       | 390 ms |

---

## json

Number of Logs: **10000**

| Logger       | Time  |
| ------------ | ----- |
| Ogma Regular | 31 ms |
| Ogma JSON    | 43 ms |
| Pino         | 22 ms |
| Winston JSON | 36 ms |
| Bunayn       | 56 ms |

---

## deep

Number of Logs: **10000**

| Logger       | Time   |
| ------------ | ------ |
| Ogma Regular | 276 ms |
| Ogma JSON    | 348 ms |
| Pino         | 183 ms |
| Winston JSON | 339 ms |
| Bunayn       | 221 ms |

---

Benchmarks generated from Linux/linux x64 4.15.0-70-generic ~Intel(R) Core(TM) i3-8130U CPU @ 2.20GHz (cores/threads: 4)
