# 07 - Express Router & MVC Architecture

## What I learned
- Splitting routes into separate files with `express.Router()`
- Organizing code into **Models**, **Views**, and **Controllers**
- Importing controller functions into routers
- Using **dynamic routes** with `:params` (e.g. `/homes-edit/:homeId`)
- Separating GET (read) and POST (write) endpoints
- Keeping business logic out of route files

## What's inside

### Routers (what URL triggers what)
- `mainRouter.js` — home page routes
- `hostRouter.js` — host (admin) routes: add, edit, delete homes
- `userRouter.js` — user routes: browse, favourite homes

### Controllers (what to do when a URL is hit)
- `crashController.js` — practice/error handling
- `hostController.js` — logic for host actions (add/edit/delete homes)
- `userController.js` — logic for user actions (browse/favourite homes)

### Models (how data is stored)
- `Datastorage.js` — Product model with fs-based CRUD
- `FavouriteHomeStorage.js` — Favourite homes model

## The MVC flow — how one request works

When someone visits `/Host/homes-edit/123`:

1. **App.js** sees `/Host` prefix → passes to `hostRouter`
2. **hostRouter.js** matches `/homes-edit/:homeId` → calls `homesEdit` controller
3. **hostController.js** `homesEdit()` does:
   - extracts `req.params.homeId` (= `123`)
   - calls `Datastorage.fetchAll()` to get data
   - finds the matching home
   - renders `views/Host/edit-home.ejs` with that home
4. **View** (EJS) displays the edit form
5. User submits → POST `/homes-edit/123` → `homesPostEdit()` → updates model → redirects

That's MVC: **URL → Router → Controller → Model → View → Response.**

## Why MVC matters

| Without MVC | With MVC |
|-------------|----------|
| All logic in one huge `app.js` | Each concern in its own file |
| Hard to find bugs | Easy to locate: bug in controller? go to `Controller/` |
| Can't reuse code | Controllers are reusable functions |
| One change breaks everything | Change a view without touching logic |

## Key code — the router pattern

\`\`\`js
const hostRouter = express.Router();

// Import controller functions
const { getController, postController, deleteHome } = require("../Controller/hostController");

// Wire routes to controllers
hostRouter.get("/add-home", getController);
hostRouter.post("/add-home", postController);

// Dynamic route with param
hostRouter.get("/homes-edit/:homeId", homesEdit);
hostRouter.post("/homes-delete/:homeId", deleteHome);

module.exports = hostRouter;
\`\`\`

Then in `App.js`:
\`\`\`js
App.use("/Host", hostRouter);
\`\`\`

Every route inside `hostRouter` is now prefixed with `/Host`.

## Challenges I faced
- Keeping controller logic OUT of routers (easy to accidentally write `res.send()` in the router)
- Making sure dynamic routes like `/homes-edit/:id` don't clash with static routes like `/homes`
- Passing data from controllers to EJS views cleanly

## Takeaway
MVC is not a library — it's a **way of organizing code**. Router decides *who handles the URL*, Controller decides *what to do*, Model decides *how to store data*, View decides *what to show*. Once you separate these, your app can grow 10x without becoming chaos.
