## basic

Number of Logs: **10000**

| Logger       | Time   |
| ------------ | ------ |
| Ogma Regular | 52 ms  |
| Ogma JSON    | 50 ms  |
| Pino         | 32 ms  |
| Winston JSON | 117 ms |
| Bunayn       | 65 ms  |

---

## long

Number of Logs: **10000**

| Logger       | Time   |
| ------------ | ------ |
| Ogma Regular | 118 ms |
| Ogma JSON    | 353 ms |
| Pino         | 326 ms |
| Winston JSON | 370 ms |
| Bunayn       | 365 ms |

---

## json

Number of Logs: **10000**

| Logger       | Time  |
| ------------ | ----- |
| Ogma Regular | 32 ms |
| Ogma JSON    | 42 ms |
| Pino         | 20 ms |
| Winston JSON | 33 ms |
| Bunayn       | 58 ms |

---

## deep

Number of Logs: **10000**

| Logger       | Time   |
| ------------ | ------ |
| Ogma Regular | 251 ms |
| Ogma JSON    | 365 ms |
| Pino         | 217 ms |
| Winston JSON | 376 ms |
| Bunayn       | 256 ms |

---

Benchmarks generated from Linux/linux x64 4.15.0-70-generic ~Intel(R) Core(TM) i3-8130U CPU @ 2.20GHz (cores/threads: 4)
