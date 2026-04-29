# Pickflix

> Stop scrolling, start watching. Three swipes and you're in.

A single-page web app that helps you decide what to watch tonight. Pick a mood (movie or show), pick a genre, swipe Tinder-style through curated cards, and get a side-by-side comparison with a winner pick.

## Stack

- Plain HTML + CSS + JS — no build step, no framework, no dependencies
- Google Fonts: Playfair Display (serif, for questions) + Inter (sans, body)
- Posters served via TMDB's public CDN
- Curated dataset of 36 titles across 6 genres (`data.js`)

## Run locally

Just open `index.html` in any modern browser. That's it.

If you want a real local server (recommended — some browsers block module/font loads from `file://`):

```bash
# Option A — Python (already installed on Mac)
python3 -m http.server 8000

# Option B — Node
npx serve .
```

Then visit `http://localhost:8000`.

## Deploy on Vercel

You're 5 minutes away from a live URL.

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Pickflix — initial commit"
```

Create an empty repo on github.com (don't add README — you have one). Then:

```bash
git remote add origin https://github.com/<your-username>/pickflix.git
git branch -M main
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New → Project**
3. Pick the `pickflix` repo
4. **Don't change anything** — Vercel auto-detects this as a static site
5. Click **Deploy**

About 30 seconds later you'll get a URL like `pickflix-yourname.vercel.app`. Every `git push` from now on auto-deploys.

### 3. (Optional) Custom domain

In your Vercel project → Settings → Domains. Add your domain and follow the DNS instructions. SSL is automatic.

## Updating your live site after the first deploy

Every time you change a file (in your editor or the workspace folder), push the change to GitHub and Vercel auto-deploys within ~30 seconds. From the project folder in your terminal:

```bash
git add .
git commit -m "describe what you changed"
git push
```

That's it. Open your Vercel dashboard if you want to watch the build — it'll show a new deployment kicking off. Each deploy gets its own preview URL, and your main domain updates as soon as it's done.

If something goes wrong:
- Vercel → your project → **Deployments** tab — click the failing deployment to see logs
- Most failures here would be HTML/JS syntax errors (since there's no build step) — open the browser console on the live site to see them
- Rolling back is one click: any old deployment in the list has a "Promote to Production" option

Common operations:
- **Swap a poster URL or add a new title:** edit `data.js`, then `git add . && git commit -m "update catalog" && git push`
- **Tweak a colour:** edit `:root` in `styles.css`, push
- **Change copy:** edit `index.html`, push

## Customising

### Swap in your own titles
Open `data.js`. Each entry follows this shape:

```js
{
  id: 1,
  title: "Inception",
  type: "movie",                    // "movie" | "show"
  genres: ["Sci-Fi", "Action"],     // first one is the primary tag
  runtime: "2h 28m",                // any free-form string
  imdb: 8.8,                        // 0–10
  rt: 87,                           // 0–100
  year: 2010,
  poster: "https://image.tmdb.org/t/p/w500/...",
  ott: ["Netflix", "Prime Video"],  // India OTT availability
  tags: ["All-time great"],         // any subset of: Trending, Popular, New, Crowd-pleaser, Critic favourite, All-time great, Comfort watch
  blurb: "..."                      // not currently shown, but available
}
```

### Swap to a live API
The whole catalog lives in one file (`data.js`). To use TMDB instead:
1. Get a free TMDB API key at themoviedb.org
2. Replace the `CATALOG` constant with a `fetch()` call inside an async `loadCatalog()` function
3. Call `loadCatalog()` before `buildDeck()` runs

Note: TMDB doesn't include India-specific OTT info reliably. Combine with [JustWatch](https://www.justwatch.com/) data if you need that.

### Tweak the design tokens
All colours, fonts, and motion variables live in `:root` at the top of `styles.css`. Change `--red` to rebrand instantly.

## Files

```
pickflix/
├── index.html      # 5 screens, single page
├── styles.css      # design tokens + all styles
├── script.js       # state machine + swipe logic + winner pick
├── data.js         # curated dataset (36 titles)
└── README.md
```

## Keyboard shortcuts

On the swipe screen:
- `→` Like
- `←` Reject

## Notes on the curated data

OTT availability in India was hand-curated as of build date — services rotate titles constantly, so consider it indicative. The app is structured so swapping in a real-time data source later is a single-file change.
