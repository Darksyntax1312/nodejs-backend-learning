# 03 - Streams & Buffers

## What I learned
- **Buffers** are chunks of raw binary data
- **Streams** read/write data in chunks (not all at once)
- Streams save memory on large files
- Event-based API: `on("data")`, `on("end")`, `on("error")`

## What's inside
- `stream-demo.js` — a demo showing both a buffer and a read stream

## Buffer vs Stream

| Buffer | Stream |
|--------|--------|
| Holds raw bytes in memory | Reads data in chunks |
| Whole file loaded at once | One chunk at a time |
| Simple to use | Memory-efficient |
| Bad for big files | Good for big files |

## Key code

### Creating a buffer
\`\`\`js
const buf = Buffer.from("Hello");
console.log(buf.toString());  // "Hello"
\`\`\`

### Reading a file as a stream
\`\`\`js
const fs = require("fs");
const stream = fs.createReadStream("big-file.txt");

stream.on("data", (chunk) => {
  console.log("got chunk of size:", chunk.length);
});

stream.on("end", () => {
  console.log("done");
});
\`\`\`

## Takeaway
Streams are how Node handles large data efficiently. Instead of loading a 10GB file into memory (and crashing), Node reads it in small chunks (e.g. 64KB at a time). Buffers are the raw byte containers that streams work with.