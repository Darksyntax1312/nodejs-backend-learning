# 06 - Express Basics

## What I learned
- Setting up an Express server with `express()`
- Serving on a port with `app.listen()`
- Parsing form data with `express.urlencoded()`
- Parsing JSON with `express.json()`
- Serving static files with `express.static()`
- Setting EJS as the view engine
- Using routers to split routes into files
- Mounting routers at a prefix path (`/Host`)
- Writing a custom 404 handler with `res.status().render()`

## What's inside
- `App.js` — The main Express server file
- `package.json` — Project dependencies (express, ejs, etc.)

## Key code — the setup pattern

\`\`\`js
const express = require("express");
const App = express();

// Body parsing
App.use(express.urlencoded({ extended: true }));
App.use(express.json());

// View engine
App.set("view engine", "ejs");
App.set("views", path.join(root, "views"));

// Static files
App.use(express.static(path.join(root, "public")));

// Routers (modular routes)
App.use(MainRouter);
App.use(userRouter);
App.use("/Host", hostRouter);   // mounted at /Host

// 404 fallback
App.use((req, res) => {
  res.status(404).render("404mess", { title: "Page not found" });
});

App.listen(3000, () => console.log("Server launched at port 3000"));
\`\`\`

## Concepts explained

### Middleware
Every `App.use(...)` is middleware — it runs on every request in order. Body parsers, static file handlers, and routers are all middleware.

### Router mounting
\`App.use("/Host", hostRouter)\` means every route inside `hostRouter.js` is prefixed with `/Host`. So `/` inside hostRouter becomes `/Host/`.

### The 404 handler
Placed **last**, after all routes — any request that didn't match earlier routes hits this. It's the "catch-all" for unknown URLs.

## Challenges I faced
- Making sure `express.static()` comes before the 404 handler, otherwise static files wouldn't load
- Mounting routers at prefixes without breaking internal paths
- Setting up EJS views path correctly with `path.join()`

## Takeaway
Express is just middleware stacked in order. Every `app.use()` adds a layer. Order matters — body parsers first, then routers, then static files, then 404 handler.
