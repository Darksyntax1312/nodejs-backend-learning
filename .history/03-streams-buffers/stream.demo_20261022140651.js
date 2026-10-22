// stream-demo.js — demonstrates streams and buffers
// Run: node stream-demo.js

const fs = require("fs");

// ============================================================
// 1. BUFFER — raw binary data in memory
// ============================================================
const buf = Buffer.from("Hello, Mayank!");
console.log("Buffer:", buf);           // <Buffer 48 65 6c 6c 6f ...>
console.log("As string:", buf.toString());

// ============================================================
// 2. STREAM — read data in chunks
// ============================================================
// Instead of loading the whole file, streams read chunk by chunk.
// This is memory-efficient for big files.

const readStream = fs.createReadStream("stream-demo.js", { encoding: "utf-8" });

let chunkCount = 0;
readStream.on("data", (chunk) => {
  chunkCount++;
  console.log(`\n--- Chunk ${chunkCount} (${chunk.length} chars) ---`);
  console.log(chunk.substring(0, 50) + "..."); // first 50 chars of each chunk
});

readStream.on("end", () => {
  console.log(`\n✅ Done — file read in ${chunkCount} chunk(s).`);
});

readStream.on("error", (err) => {
  console.error("Error:", err.message);
});

// ============================================================
// Why streams matter:
// - fs.readFile() loads the WHOLE file into memory at once
// - fs.createReadStream() reads it in chunks
// - For a 10GB file, readFile would crash; streams would work fine
// ============================================================