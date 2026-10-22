# 10 - Data Persistence with JSON Files

## What I learned
- Using a JSON file as a simple "database"
- Structuring data as an array of objects
- **Two persistence patterns**:
  1. Storing full objects (all fields) — `Datastorage.js`
  2. Storing only IDs (relationships) — `FavouriteHomeStorage.js`
- Deduplication (not adding the same favourite twice)
- Reading + parsing + writing back in one flow

## What's inside
- `FavouriteHomeStorage.js` — a model that stores **only favourite home IDs** in `NewIdFile.txt`
- `sample-data.json` — a sample dataset showing the shape of stored homes

> Related file: `02-file-system/Datastorage.js` shows the "store full objects" pattern. Together they represent two sides of persistence.

## The two persistence patterns

### Pattern 1: Store the full object
Used in `02-file-system/Datastorage.js`

\`\`\`json
[
  { "id": "abc", "Name": "Green-villa", "Price": "1500", "Location": "Mumbai" },
  { "id": "def", "Name": "Blue-apartment", "Price": "2000", "Location": "Delhi" }
]
\`\`\`

Used when the data is **the main entity** (homes, users, products).

### Pattern 2: Store only IDs (relationships)
Used in `10-json-persistence/FavouriteHomeStorage.js`

\`\`\`json
["abc", "def", "xyz"]
\`\`\`

Used when you're storing a **relationship** between two things:
- User X favourited homes "abc" and "def"
- No need to duplicate the home data — just reference its ID

This is the same idea as a **SQL foreign key** or a **join table**. In MongoDB, it's the "reference" pattern.

## Code pattern — dedupe on save

\`\`\`js
save() {
  fs.readFile("NewIdFile.txt", (err, data) => {
    let existingIdData = [];
    if (!err && data.length > 0) {
      existingIdData = JSON.parse(data.toString());
    }

    // Only add if not already present
    if (!existingIdData.includes(this.productId)) {
      existingIdData.push(this.productId);
    }

    fs.writeFile("NewIdFile.txt", JSON.stringify(existingIdData), (err) => {
      if (err) console.log(err);
      else console.log("File written successfully");
    });
  });
}
\`\`\`

The `includes()` check **prevents duplicates** — if you click "favourite" twice, the ID only appears once. That's a real-world requirement.

## Why JSON files work for small apps

| Pro | Con |
|-----|-----|
| No setup needed | No concurrency handling |
| Human-readable | Slows down with big files |
| Easy to debug | No indexing or queries |
| Perfect for learning | No transactions |

## When to move to a real database

You should switch from JSON files to MongoDB/PostgreSQL when:

- **Concurrent writes** happen (two users saving at the same time → corrupted file)
- **Data grows** past a few thousand records
- You need **queries** (filter, sort, join) without loading everything
- You need **indexes** for fast lookups
- You need **transactions** (atomic operations)

Every real app starts with a simple store and migrates when it outgrows it. Knowing **both** is the skill.

## Challenges I faced
- Reading + parsing + writing back **without overwriting existing data**
- Preventing duplicate favourite IDs (`includes()` check)
- Handling the case when the file doesn't exist yet (ENOENT)

## Takeaway
JSON-as-database teaches the **core pattern** — read, modify, write. The same pattern (with more safety) applies to real databases. You also learned the difference between **storing entities** (full objects) and **storing relationships** (just IDs). That distinction is one of the most important ideas in database design.
