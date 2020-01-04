## basic

Number of Logs: **10000**

| Logger       | Time   |
| ------------ | ------ |
| Ogma Regular | 45 ms  |
| Ogma JSON    | 52 ms  |
| Pino         | 26 ms  |
| Winston JSON | 119 ms |
| Bunayn       | 67 ms  |

---

## long

Number of Logs: **10000**

| Logger       | Time   |
| ------------ | ------ |
| Ogma Regular | 121 ms |
| Ogma JSON    | 342 ms |
| Pino         | 323 ms |
| Winston JSON | 364 ms |
| Bunayn       | 365 ms |

---

## json

Number of Logs: **10000**

| Logger       | Time  |
| ------------ | ----- |
| Ogma Regular | 36 ms |
| Ogma JSON    | 40 ms |
| Pino         | 20 ms |
| Winston JSON | 35 ms |
| Bunayn       | 51 ms |

---

## deep

Number of Logs: **10000**

| Logger       | Time   |
| ------------ | ------ |
| Ogma Regular | 249 ms |
| Ogma JSON    | 315 ms |
| Pino         | 182 ms |
| Winston JSON | 319 ms |
| Bunayn       | 201 ms |

---

Benchmarks generated from Linux/linux x64 4.15.0-70-generic ~Intel(R) Core(TM) i3-8130U CPU @ 2.20GHz (cores/threads: 4)
