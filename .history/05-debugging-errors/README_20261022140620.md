# 05 - Debugging & Error Handling

## What I learned
- **Bugs are normal** — even small typos cause big problems
- The difference between `=` (assignment) and `===` (comparison)
- Using `console.log` to trace what's happening
- Understanding error messages instead of panicking
- `try/catch` for handling errors in async code

## What's inside
- `logical.js` — a **deliberately buggy file** (see the bug below)
- `syntax.js` — syntax debugging practice

## The bug in `logical.js`

\`\`\`js
const logical = () => {
  let x = 5;
  if (x = 10) {          // 🐛 BUG: assignment, not comparison
    console.log(x);      // always runs — prints 10
  } else {
    console.log(10);     // never runs
  }
};
\`\`\`

### Why this is a bug
- `x = 10` — assigns 10 to `x`, returns 10 (truthy)
- `x === 10` — compares x to 10, returns true/false

Because `x = 10` is **truthy**, the `if` block **always runs**, no matter the initial value of `x`.

### The fix
\`\`\`js
if (x === 10) { ... }    // proper comparison
\`\`\`

## The 3 kinds of bugs

| Type | Example | How to catch |
|------|---------|--------------|
| Syntax | missing `}` | Node won't run — reads the error |
| Logic | `x = 10` vs `x === 10` | run it, trace with `console.log` |
| Runtime | calling `.map` on `null` | try/catch or check types |

## Takeaway
Debugging is not "guessing what's wrong" — it's **reading the error carefully**, **adding logs**, and **checking assumptions**. Every bug you fix teaches you something that will save you hours later.