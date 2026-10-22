# 🏡 Capstone — Airbnb Clone (Full Stack)

> The complete project I built through my Node.js + Express + EJS learning journey.
> Every concept from `01-` to `10-` is used in this app.

## 🔗 Links
- **Full repo**: https://github.com/Darksyntax1312/airbnb-clone
- **Main app file**: [`App.js`](https://github.com/Darksyntax1312/airbnb-clone/blob/main/App.js)

## 📌 What it is

A clone of Airbnb's core flow — users can browse homes, hosts can add/edit/delete listings, and users can favourite homes.

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Runtime | Node.js |
| Server | Express |
| Templating | EJS |
| Styling | Tailwind CSS (via CLI) |
| Data storage | JSON files (via `fs`) |
| Routing | Express Router (MVC) |
| Auth flow | Session-like form-based routing |

## 🧠 Concepts used (and where to find them in this repo)

| Concept | Used in Airbnb | Learning folder |
|---------|----------------|------------------|
| Node fundamentals | `require`, modules, path | [`01`](../01-nodejs-fundamentals/) |
| File System CRUD | `Newfile.txt`, `NewIdFile.txt` | [`02`](../02-file-system/) |
| Streams & buffers | served static assets | [`03`](../03-streams-buffers/) |
| Event loop & async | all `fs` callbacks | [`04`](../04-event-loop-async/) |
| Debugging | form validation, error pages | [`05`](../05-debugging-errors/) |
| Express basics | server setup, middleware | [`06`](../06-express-basics/) |
| MVC architecture | routes + controllers + models | [`07`](../07-express-mvc/) |
| EJS + Tailwind | all pages | [`08`](../08-ejs-tailwind/) |
| Dynamic routes | `/homes-edit/:homeId` etc. | [`09`](../09-dynamic-routes/) |
| JSON persistence | `Datastorage`, `FavouriteHomeStorage` | [`10`](../10-json-persistence/) |

## 🗂 Folder structure of the Airbnb clone

\`\`\`
airbnb-clone/
├── App.js                ← Express server (entry point)
├── package.json
├── Controller/           ← MVC controllers
│   ├── hostController.js
│   ├── userController.js
│   └── crashController.js
├── Model/                ← MVC models (data layer)
│   ├── Datastorage.js
│   └── FavouriteHomeStorage.js
├── routes/               ← Express Router files
│   ├── hostRouter.js
│   ├── userRouter.js
│   └── mainRouter.js
├── views/                ← EJS templates
│   ├── Mainpage.ejs
│   ├── 404mess.ejs
│   ├── admin/
│   ├── store/
│   ├── user/
│   └── partials/         ← reusable EJS components
├── public/               ← static files (CSS, images)
├── src/                  ← Tailwind source
│   └── input.css
└── utils/                ← helpers
    └── pathUtils.js
\`\`\`

## 🎯 User flows the app supports

### As a **host**
1. Visit `/Host/Home-page` → host dashboard
2. Add a new home → `/Host/add-home` (GET form) → POST submits
3. View all homes → `/Host/homes`
4. Edit a home → `/Host/homes-edit/:homeId`
5. Delete a home → POST `/Host/homes-delete/:homeId`

### As a **user**
1. Visit `/User-page` → user dashboard
2. Browse homes → `/store/home-list`
3. View home details → `/store/home-detail/:id`
4. Favourite a home → POST → adds to `NewIdFile.txt`
5. View favourites → `/store/favourite-list`
6. Remove favourite → POST → removes from `NewIdFile.txt`

## 🚧 What I'd do differently now

- **Migrate JSON storage to MongoDB** — `Datastorage.js` has a clean interface; swapping the internals is straightforward
- **Add authentication** — currently routes are open; real auth (sessions + password hashing) is the next step
- **Add tests** — none currently, but each controller has one clear responsibility = easy to test
- **Improve error handling** — `crashController.js` shows current approach; a central error middleware would be cleaner

## 🏆 What this capstone proves

- I can build a **complete full-stack app** from scratch
- I understand **MVC separation of concerns**
- I can wire **routers → controllers → models → views**
- I can **persist data** without a full database
- I can **style server-rendered pages** with Tailwind
- I can **document** my own code so someone else can pick it up

## 📈 Next step

Learning **databases properly** — SQL vs NoSQL, schema design, indexing — and then migrating this app's `Model/` layer from JSON files to MongoDB.
