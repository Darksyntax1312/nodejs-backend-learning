# 01 - Node.js Fundamentals

## What I learned
- Creating a server with **raw Node.js** (`http` module)
- Creating a server with **Express** (framework)
- The difference between the two approaches
- `require()` for importing modules
- `module.exports` for exporting
- The `path` module for file paths
- `__dirname` for current directory

## What's inside
- `Method1.js` — a server built with the built-in `http` module (no frameworks)
- `Method2.js` — the same server idea, but using Express
- `pathUtils.js` — a utility using Node's `path` module

## Raw Node vs Express — side by side

### Method1.js — Raw Node.js `http` module
\`\`\`js
const http = require("http");
const server = http.createServer((req, res) => {
  if (req.url === "/data") res.end("...");
  else if (req.url === "/users") res.end("...");
});
server.listen(3000);
\`\`\`

### Method2.js — Express
\`\`\`js
const express = require("express");
const app = express();
app.get("/users", (req, res) => res.send("..."));
app.listen(3000);
\`\`\`

## Why Express exists
Raw `http` works, but you'd have to manually:
- parse URLs
- check request methods (GET/POST/etc.)
- parse request bodies
- handle static files
- write a router for every URL

Express gives you all of that out of the box — cleaner, less code, easier to grow.

## Takeaway
Node.js is a **runtime** (runs JS on the server). Express is a **framework** that sits on top and makes building servers much easier. Both are useful to know — the raw `http` module shows you **what's happening under the hood**, and Express shows you **how real apps are built**.