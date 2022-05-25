# Trouble App

| Route | 200 | 301 | 400 | 404 | 500 | Latency |
| -------- | --- | --- | --- | --- | --- | ------- |
| / | 84% | 10% | 5% | 0% | 1% | - |
| /turtle | 100% | 0% | 0% | 0% | 0% | 100ms - 1100ms |
| /nightmare | 0% | 0% | 40% | 10% | 50% | 0ms - 2000ms |

# Requesting via CURL

Root
```bash
while true; do curl localhost:3000/; echo; sleep 1; done
```

Turtle
```bash
while true; do curl localhost:3000/turtle; echo; sleep 1; done
```

Nightmare (1s timeout)
```bash
while true; do curl localhost:3000/nightmare --max-time 1; echo; sleep 1; done
```

