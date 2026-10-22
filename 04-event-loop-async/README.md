# 04 - Event Loop & Async Architecture

## What I learned
- Node.js is **single-threaded** but handles many requests via the **event loop**
- Synchronous code blocks; asynchronous code doesn't
- The event loop processes callbacks from a queue
- `setTimeout`, `Promise`, and `async/await` all use the event loop
- The order of execution is not always top-to-bottom

## What's inside
- `runob.js` — a small demo showing execution order with async code

## The event loop — how it works

Node.js has **one thread** (the "call stack"). When you call `setTimeout` or `fs.readFile`, Node hands that work to the system and **keeps running**. When the work finishes, the callback goes into a **queue**, and the event loop runs it **after the current code finishes**.

That's why this:

\`\`\`js
console.log("1");
setTimeout(() => console.log("2"), 0);
console.log("3");
\`\`\`

Prints **1, 3, 2** — not 1, 2, 3. The `setTimeout` callback waits in the queue until the current code is done.

## Takeaway
The event loop is why Node can serve thousands of requests with one thread. It never "waits" for I/O — it just schedules a callback and moves on. Async/await and Promises are all built on top of this idea.