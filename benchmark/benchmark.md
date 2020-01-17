## basic

Number of Logs: **10000**

| Logger       | Time   |
| ------------ | ------ |
| Ogma Regular | 50 ms  |
| Ogma JSON    | 43 ms  |
| Pino         | 23 ms  |
| Winston JSON | 114 ms |
| Bunayn       | 62 ms  |

---

## long

Number of Logs: **10000**

| Logger       | Time   |
| ------------ | ------ |
| Ogma Regular | 120 ms |
| Ogma JSON    | 352 ms |
| Pino         | 325 ms |
| Winston JSON | 382 ms |
| Bunayn       | 374 ms |

---

## json

Number of Logs: **10000**

| Logger       | Time  |
| ------------ | ----- |
| Ogma Regular | 31 ms |
| Ogma JSON    | 39 ms |
| Pino         | 23 ms |
| Winston JSON | 39 ms |
| Bunayn       | 50 ms |

---

## deep

Number of Logs: **10000**

| Logger       | Time   |
| ------------ | ------ |
| Ogma Regular | 278 ms |
| Ogma JSON    | 337 ms |
| Pino         | 172 ms |
| Winston JSON | 329 ms |
| Bunayn       | 211 ms |

---

Benchmarks generated from Linux/linux x64 4.15.0-70-generic ~Intel(R) Core(TM) i3-8130U CPU @ 2.20GHz (cores/threads: 4)
