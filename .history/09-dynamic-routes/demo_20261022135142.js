// demo.js — small Express app showing req.params vs req.query
// Run: node demo.js → then visit the URLs below

const express = require("express");
const app = express();

// ============================================================
// req.params — values from the URL PATH
// URL shape: /user/:id  →  req.params.id
// ============================================================

// GET /user/42 → req.params.id = "42"
app.get("/user/:id", (req, res) => {
  res.send(`User ID from params: ${req.params.id}`);
});

// GET /post/2024/hello-world → req.params.year = "2024", req.params.slug = "hello-world"
app.get("/post/:year/:slug", (req, res) => {
  res.json({
    year: req.params.year,
    slug: req.params.slug,
  });
});

// ============================================================
// req.query — values from the URL QUERY STRING (?key=value)
// URL shape: /search?q=laptop&limit=10  →  req.query.q, req.query.limit
// ============================================================

// GET /search?q=laptop → req.query.q = "laptop"
// GET /search?q=laptop&limit=5 → req.query.q = "laptop", req.query.limit = "5"
app.get("/search", (req, res) => {
  const { q, limit } = req.query;
  res.json({
    query: q || "(none)",
    limit: limit || "no limit",
    message: q ? `You searched for: ${q}` : "Please add ?q=something",
  });
});

app.listen(3001, () => {
  console.log("Demo running at http://localhost:3001");
  console.log("");
  console.log("Try these URLs:");
  console.log("  http://localhost:3001/user/42");
  console.log("  http://localhost:3001/post/2024/hello-world");
  console.log("  http://localhost:3001/search?q=laptop&limit=5");
});