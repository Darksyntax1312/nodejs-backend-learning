# 09 - Dynamic Routes & Query Parameters

## What I learned
- Using **dynamic URL segments** with `:paramName` in routes
- Reading dynamic values with `req.params`
- Using **query strings** with `req.query`
- The difference between path params and query params
- Passing dynamic IDs to controllers for edit/delete operations

## What's inside

### Real-world examples (from my Airbnb project)
- `hostController.js` — uses `req.params.homeId` for:
  - editing a home (`/homes-edit/:homeId`)
  - updating a home
  - deleting a home
- `userController.js` — uses `req.params.homeId` for:
  - viewing a home detail
  - adding to favourites
  - removing from favourites

### Standalone demo
- `demo.js` — a tiny Express app that runs on port 3001 and demonstrates both `req.params` and `req.query` side by side.
  - Run it: `node demo.js`
  - Then visit: `http://localhost:3001/user/42`
  - Then visit: `http://localhost:3001/search?q=laptop`

## req.params vs req.query — the difference

### `req.params` — values inside the URL PATH

Defined by the route. Part of the **path itself**.

\`\`\`js
app.get("/user/:id", (req, res) => {
  console.log(req.params.id);  // "42" for GET /user/42
});
\`\`\`

Use it when: the value **identifies a specific resource**.
- `/homes-edit/123` → edit home with id 123
- `/user/profile` → user 123's profile
- `/post/2024/hello` → the post named "hello" from 2024

### `req.query` — values after the `?` in the URL

Optional filters/options. Not part of the path.

\`\`\`js
app.get("/search", (req, res) => {
  console.log(req.query.q);      // "laptop" for GET /search?q=laptop
  console.log(req.query.limit);  // "5" for GET /search?q=laptop&limit=5
});
\`\`\`

Use it when: the value **filters or customizes** a list.
- `/search?q=laptop` → search results for "laptop"
- `/homes?city=mumbai&price=2000` → filter homes
- `/posts?page=2&limit=10` → pagination

## Side-by-side example

| URL | `req.params` | `req.query` |
|-----|--------------|-------------|
| `/user/42` | `{ id: "42" }` | `{}` |
| `/user/42?tab=posts` | `{ id: "42" }` | `{ tab: "posts" }` |
| `/search?q=laptop&limit=5` | `{}` | `{ q: "laptop", limit: "5" }` |

**Rule of thumb:**
- **`req.params`** = "which thing?" (identifies a resource)
- **`req.query`** = "how do you want it?" (filter, sort, paginate)

## Real code from my project

\`\`\`js
// hostRouter.js
hostRouter.get("/homes-edit/:homeId", homesEdit);
hostRouter.post("/homes-delete/:homeId", deleteHome);

// hostController.js
exports.homesEdit = (req, res, next) => {
  const requestId = req.params.homeId;  // "123" for GET /Host/homes-edit/123
  // ...fetch that home and render edit page
};

exports.deleteHome = (req, res, next) => {
  const requestId = req.params.homeId;
  product.deleteHome(requestId, (err, deleted) => {
    if (err) return next(err);
    res.redirect("/Host/homes");
  });
};
\`\`\`

## Challenges I faced
- Keeping `req.params` IDs as **strings** (they're never numbers by default)
- Comparing IDs correctly: `String(item.id) === String(req.params.homeId)` (UUIDs as strings)
- Choosing between params (edit one item) vs query (filter a list)

## Takeaway
`req.params` and `req.query` both come from the URL, but solve different problems. **Params identify a resource** (which specific item). **Query customizes a collection** (filter/search/sort). Once you get this, RESTful routing becomes second nature.
