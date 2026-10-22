# 02 - File System (fs)

## What I learned
- Reading files with `fs.readFile()`
- Writing files with `fs.writeFile()`
- Using `JSON.parse()` and `JSON.stringify()` with fs
- Handling errors like `ENOENT` (file not found)
- Using `crypto.randomUUID()` to generate unique IDs

## What's inside
- `Datastorage.js` — A complete CRUD data layer using only `fs`.
  - `save()` — create a new product, append to JSON file
  - `fetchAll()` — read all products from file
  - `updateById(id, updates)` — update a product by ID
  - `deleteHome(id)` — delete a product by ID
- `Newfile.txt` — The "database" (JSON array of homes)
- `NewIdFile.txt` — A file used to store/append new IDs

## Key code — the pattern I used

Reading:
\`\`\`js
fs.readFile("Newfile.txt", (err, data) => {
  if (err) return handleError(err);
  const items = JSON.parse(data);
});
\`\`\`

Writing:
\`\`\`js
fs.writeFile("Newfile.txt", JSON.stringify(items), (err) => {
  if (err) return handleError(err);
});
\`\`\`

## Challenges I faced
- Handling the case when the file doesn't exist yet (ENOENT)
- Parsing invalid JSON without crashing the app
- Updating one item without rewriting everything wrong

## Takeaway
The `fs` module lets Node read and write real files on disk. By combining it with JSON, you can build a simple "database" without any actual database software. This is how early versions of many apps work before they migrate to MongoDB or Postgres.
