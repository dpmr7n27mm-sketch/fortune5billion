# fortune5billion.com

Next.js app deployed on Vercel via GitHub.

## Routes
- `/` — main hub (fortune5billion.com)
- `/niragame` — N.I.R.A. game (fortune5billion.com/niragame)

## Stack
- Next.js (JavaScript, not TypeScript)
- Vercel deployment (auto-deploys on push to main)
- GitHub: push to trigger deploy

## File structure
- `app/layout.js` — root layout
- `app/page.js` — home page
- `app/niragame/layout.js` — niragame layout
- `app/niragame/page.js` — niragame page

## Rules
- Keep `/` and `/niragame` in sync visually and functionally — test both after any change.
- Do not add TypeScript. Keep it plain JavaScript.
- Do not add unnecessary dependencies. Check `package.json` before installing anything new.
- Small, safe commits. One concern per commit.

## Common commands
- `npm run dev` — local dev server
- `git add . && git commit -m "message" && git push` — deploy to Vercel via GitHub