# 08 - EJS Templates & Tailwind CSS

## What I learned
- Rendering dynamic HTML with EJS (Embedded JavaScript)
- Splitting reusable UI into **partials** (header, footer, nav)
- Using `<%- include() %>` to compose pages from partials
- Outputting variables with `<%= %>`
- Running JS logic in templates with `<% %>`
- Setting up **Tailwind CSS via CLI** (input.css → output.css)
- Serving compiled CSS from the `public/` folder

## What's inside

### Pages (top-level views)
- `Mainpage.ejs` — landing page (choose Host or User)
- `404mess.ejs` — custom 404 error page

### Partials (reusable components)
- `partials/head.ejs` — `<head>` section (meta, title, CSS link)
- `partials/Header.ejs` — main header
- `partials/footer.ejs` — main footer
- `partials/hostHeader.ejs` — header for host (admin) pages
- `partials/userhead.ejs` / `partials/userNav.ejs` / `partials/userFooter.ejs` — user-side layout pieces

### Sub-pages
- `admin/` — host-side pages (list homes, edit home, host dashboard)
- `store/` — user-side pages (browse homes, home detail, favourite list, bookings, reserve)
- `user/` — user dashboard

### Styling
- `input.css` — Tailwind source file (uses `@tailwind` directives)

## EJS syntax cheat sheet

| Syntax | What it does |
|--------|--------------|
| `<%= value %>` | Output a value (HTML-escaped) |
| `<%- value %>` | Output raw HTML (unescaped) |
| `<% code %>` | Run JS logic (no output) |
| `<%- include('partials/head') %>` | Include another EJS file |
| `<% if (x) { %> ... <% } %>` | Conditional rendering |
| `<% items.forEach(item => { %> ... <% }) %>` | Loops |

## How partials reduce repetition

Instead of copying the header into every page:

\`\`\`ejs
<!-- partials/head.ejs -->
<head>
  <meta charset="UTF-8">
  <title><%= title %></title>
  <link rel="stylesheet" href="/css/output.css">
</head>
\`\`\`

Every page includes it:

\`\`\`ejs
<%- include('partials/head', { title: 'Airbnb' }) %>
\`\`\`

**Change the header once → updates everywhere.** That's the power of partials.

## Tailwind CLI setup

1. **Install Tailwind** (already in `package.json`):
   \`\`\`bash
   npm install -D tailwindcss
   \`\`\`

2. **Create `input.css`** with directives:
   \`\`\`css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   \`\`\`

3. **Build `output.css`** by watching EJS files:
   \`\`\`bash
   npx tailwindcss -i ./src/input.css -o ./public/css/output.css --watch
   \`\`\`

4. **Link compiled CSS in EJS**:
   \`\`\`html
   <link rel="stylesheet" href="/css/output.css">
   \`\`\`

The `--watch` flag rebuilds `output.css` whenever you edit `.ejs` or `.css` files.

## The full render flow

1. Controller calls `res.render('store/home-list', { homes })`
2. Express finds `views/store/home-list.ejs`
3. EJS executes the template with `homes` variable
4. `include()` pulls in partials (head, header, footer)
5. Final HTML is sent to the browser
6. Browser loads `/css/output.css` (compiled Tailwind)
7. Page appears fully styled

## Challenges I faced
- Passing variables from controller → EJS (`res.render('page', { data })`)
- Making `include()` paths correct (`partials/head` vs `../partials/head`)
- Making sure `output.css` was linked from the **public** folder (not `src/`)
- Keeping different layouts for host vs user without duplicating code

## Takeaway
EJS is "HTML with superpowers" — it lets you inject data, loop, and include reusable pieces. Combined with Tailwind (utility classes compiled to a single CSS file), you get fast, styled server-rendered pages without a React/Vue build. This is the classic full-stack pattern — still used by many production apps.
