/* =========================================================
   Pickflix — interaction logic
   ========================================================= */

// ---------- State ----------
const state = {
  type: null,          // "movie" | "show"
  niche: null,         // niche.key  OR  null when "Surprise me"
  deck: [],
  shortlist: [],
  isAnimating: false
};
const SHORTLIST_GOAL = 3;

// ---------- DOM ----------
const screens         = document.querySelectorAll(".screen");
const deckEl          = document.getElementById("deck");
const emptyStateEl    = document.getElementById("emptyState");
const progressPipsEl  = document.getElementById("progressPips");
const likeBtn         = document.getElementById("likeBtn");
const rejectBtn       = document.getElementById("rejectBtn");
const compareGridEl   = document.getElementById("compareGrid");
const compareSubEl    = document.getElementById("compareSub");
const compareHeadEl   = document.getElementById("compareHeading");
const nicheGridEl     = document.getElementById("nicheGrid");

// ---------- Niche icons (one per niche.key) ----------
const NICHE_ICONS = {
  "rom-com":  '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  "mystery":  '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/><path d="M9 11h4"/></svg>',
  "crime":    '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  "scifi":    '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/></svg>',
  "feelgood": '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><circle cx="9" cy="10" r="0.6" fill="currentColor"/><circle cx="15" cy="10" r="0.6" fill="currentColor"/></svg>',
  "action":   '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/></svg>'
};

// ---------- OTT chip logos (1-letter mark on coloured ground) ----------
function ottInitial(name) {
  if (name === "Disney+ Hotstar") return "H";
  if (name === "Apple TV+") return "TV";
  if (name === "Prime Video") return "P";
  if (name === "JioCinema") return "J";
  if (name === "Lionsgate Play") return "L";
  if (name === "SonyLIV") return "S";
  return name.charAt(0);
}

// ---------- Render the niche grid (3x2) ----------
function renderNiches() {
  nicheGridEl.innerHTML = NICHES.map(n => `
    <button class="niche-card" data-niche="${n.key}">
      <span class="niche-card__icon">${NICHE_ICONS[n.key] || ""}</span>
      <h3 class="niche-card__title">${escapeHtml(n.label)}</h3>
      <p class="niche-card__sub">${escapeHtml(n.sub)}</p>
    </button>
  `).join("");

  nicheGridEl.querySelectorAll(".niche-card").forEach(btn => {
    btn.addEventListener("click", () => {
      state.niche = btn.dataset.niche;
      buildDeck();
      go("swipe");
    });
  });
}
renderNiches();

// ---------- Screen routing ----------
function go(screenName) {
  screens.forEach(s => s.classList.toggle("is-active", s.dataset.screen === screenName));
  window.scrollTo({ top: 0, behavior: "auto" });
}

// ---------- Event delegation ----------
document.body.addEventListener("click", (e) => {
  const action = e.target.closest("[data-action]")?.dataset.action;
  if (!action) return;
  switch (action) {
    case "start":            go("type"); break;
    case "back-to-landing":  go("landing"); break;
    case "back-to-type":     go("type"); break;
    case "back-to-genre":    resetSwipeState(); go("genre"); break;
    case "restart":          resetAll(); go("landing"); break;
    case "surprise":         state.niche = null; buildDeck(); go("swipe"); break;
  }
});

// ---------- Type select ----------
document.querySelectorAll(".type-card").forEach(btn => {
  btn.addEventListener("click", () => {
    state.type = btn.dataset.type;
    go("genre");
  });
});

// ---------- Build the filtered deck ----------
function buildDeck() {
  let pool;
  if (state.niche === null) {
    // Surprise me — all titles of selected type
    pool = CATALOG.filter(c => c.type === state.type);
  } else {
    pool = CATALOG.filter(c => c.type === state.type && c.niches.includes(state.niche));
  }

  // Hard fallback: if pool < 3, pad with same-type titles to keep deck alive
  if (pool.length < 3) {
    const padding = CATALOG.filter(c => c.type === state.type && !pool.find(p => p.id === c.id));
    pool = [...pool, ...padding].slice(0, 8);
  }

  state.deck = shuffle(pool).slice(0, 8);
  state.shortlist = [];
  renderDeck();
  updateProgress();
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ---------- Render deck ----------
function renderDeck() {
  deckEl.innerHTML = "";
  if (!state.deck.length) {
    emptyStateEl.hidden = false;
    deckEl.hidden = true;
    likeBtn.disabled = true;
    rejectBtn.disabled = true;
    return;
  }
  emptyStateEl.hidden = true;
  deckEl.hidden = false;
  likeBtn.disabled = false;
  rejectBtn.disabled = false;

  state.deck.slice(0, 3).forEach((item, idx) => {
    deckEl.appendChild(buildCardEl(item, idx));
  });
}

function buildCardEl(item, stackIdx) {
  const card = document.createElement("div");
  card.className = "movie-card";
  card.dataset.stack = String(stackIdx);
  card.dataset.id = String(item.id);

  // Portrait card: full-bleed poster behind, gradient overlay at bottom with
  // title + meta. Synopsis is in the overlay too — hidden, fades in on hover.
  card.innerHTML = `
    <div class="movie-card__poster">
      <img src="${item.poster}" alt="${escapeHtml(item.title)} poster" loading="lazy" />
    </div>
    <div class="movie-card__stamp movie-card__stamp--like">Like</div>
    <div class="movie-card__stamp movie-card__stamp--nope">Skip</div>
    <div class="movie-card__overlay">
      <h3 class="movie-card__title">
        ${escapeHtml(item.title)}
        <span class="movie-card__year">${item.year}</span>
      </h3>
      <div class="movie-card__meta">
        <span class="meta-imdb">
          <span class="meta-imdb__label">IMDb</span>
          <span class="meta-imdb__star">★</span>
          ${item.imdb.toFixed(1)}
        </span>
        <span class="meta-dot">·</span>
        <span class="meta-runtime">${escapeHtml(item.runtime)}</span>
      </div>
      <p class="movie-card__synopsis">${escapeHtml(item.blurb || "")}</p>
    </div>
  `;
  return card;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ---------- Like / reject ----------
likeBtn.addEventListener("click", () => handleSwipe("like"));
rejectBtn.addEventListener("click", () => handleSwipe("reject"));

function handleSwipe(verdict) {
  if (state.isAnimating || !state.deck.length) return;
  const topCard = deckEl.querySelector('.movie-card[data-stack="0"]');
  if (!topCard) return;

  state.isAnimating = true;
  likeBtn.disabled = true;
  rejectBtn.disabled = true;

  topCard.classList.add(verdict === "like" ? "show-like" : "show-nope");

  setTimeout(() => {
    topCard.classList.add(verdict === "like" ? "fly-right" : "fly-left");
  }, 120);

  setTimeout(() => {
    const removed = state.deck.shift();
    if (verdict === "like" && removed) {
      state.shortlist.push(removed);
      updateProgress();
    }
    advance();
  }, 540);
}

function advance() {
  // Reached the goal → comparison
  if (state.shortlist.length >= SHORTLIST_GOAL) {
    setTimeout(() => {
      buildComparison();
      go("compare");
      state.isAnimating = false;
    }, 200);
    return;
  }

  // Deck empty before goal → still go to comparison if they liked anything,
  // otherwise show empty state with retry option.
  if (!state.deck.length) {
    if (state.shortlist.length === 0) {
      renderDeck();          // shows empty state
      state.isAnimating = false;
      return;
    }
    setTimeout(() => {
      buildComparison();
      go("compare");
      state.isAnimating = false;
    }, 200);
    return;
  }

  renderDeck();
  state.isAnimating = false;
}

function updateProgress() {
  const pips = progressPipsEl.querySelectorAll(".pip");
  pips.forEach((pip, i) => pip.classList.toggle("is-on", i < state.shortlist.length));
}

function resetSwipeState() {
  state.deck = []; state.shortlist = []; state.isAnimating = false;
  updateProgress();
}
function resetAll() {
  state.type = null; state.niche = null;
  resetSwipeState();
}

// ---------- Comparison ----------
function buildComparison() {
  const items = state.shortlist;
  const winnerId = pickWinner(items);
  const winner = items.find(i => i.id === winnerId);
  const others = items.filter(i => i.id !== winnerId);

  // Heading copy adapts to shortlist size
  if (items.length === 1) {
    compareHeadEl.textContent = "Your one and only";
    compareSubEl.textContent  = "You only liked one — but it's a banger.";
  } else if (items.length === 2) {
    compareHeadEl.textContent = "Two strong picks";
    compareSubEl.textContent  = "Tonight's pick is highlighted in the middle.";
  } else {
    compareHeadEl.textContent = "Your shortlist, side by side";
    compareSubEl.textContent  = "Tonight's pick is centred — flanked by your other two.";
  }

  compareGridEl.innerHTML = "";

  // Layout: [other-A] [WINNER] [other-B]
  // For 2 items: [other] [WINNER]
  // For 1 item: [WINNER] only
  const layout = [];
  if (others.length >= 1) layout.push(others[0]);
  layout.push(winner);
  if (others.length >= 2) layout.push(others[1]);

  layout.forEach(item => {
    const isWinner = item.id === winnerId;
    compareGridEl.appendChild(buildCompareCardEl(item, isWinner, items));
  });

  // Adjust grid columns based on count
  if (items.length === 1) {
    compareGridEl.style.gridTemplateColumns = "minmax(280px, 480px)";
    compareGridEl.style.justifyContent = "center";
  } else if (items.length === 2) {
    compareGridEl.style.gridTemplateColumns = "1fr 1.35fr";
  } else {
    compareGridEl.style.gridTemplateColumns = "1fr 1.35fr 1fr";
  }
}

function pickWinner(items) {
  function score(it) {
    let s = it.imdb * 10 + it.rt;
    const bonus = ["Trending", "Popular", "All-time great", "Critic favourite"];
    if (it.tags && it.tags.some(t => bonus.includes(t))) s += 6;
    return s;
  }
  return items.reduce((b, it) => score(it) > score(b) ? it : b, items[0]).id;
}

function whyWinner(winner, all) {
  const reasons = [];
  if (winner.imdb >= Math.max(...all.map(i => i.imdb))) {
    reasons.push(`top IMDb (${winner.imdb.toFixed(1)})`);
  }
  if (winner.rt >= Math.max(...all.map(i => i.rt))) {
    reasons.push(`best Rotten Tomatoes (${winner.rt}%)`);
  }
  if (winner.tags && winner.tags.length) {
    reasons.push(`tagged "${winner.tags[0]}"`);
  }
  if (!reasons.length) reasons.push("strongest overall ratings");
  return reasons.slice(0, 2).join(" + ");
}

function ottChip(name, title) {
  const svc = OTT_SERVICES[name];
  if (!svc) return "";
  const url = svc.url.replace("{q}", encodeURIComponent(title));
  return `
    <a class="ott-chip" href="${url}" target="_blank" rel="noopener noreferrer"
       style="--ott-bg: ${svc.color}" title="Search ${escapeHtml(name)}">
      <span class="ott-chip__logo">${ottInitial(name)}</span>
      <span class="ott-chip__name">${escapeHtml(name)}</span>
      <svg class="ott-chip__redirect" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M7 17 17 7M7 7h10v10"/>
      </svg>
    </a>
  `;
}

function primaryWatchUrl(item) {
  const primary = item.ott && item.ott[0];
  if (primary && OTT_SERVICES[primary]) {
    return {
      url: OTT_SERVICES[primary].url.replace("{q}", encodeURIComponent(item.title)),
      service: primary
    };
  }
  // Fallback if no OTT info: Google search
  return {
    url: "https://www.google.com/search?q=" + encodeURIComponent(`watch ${item.title} online india`),
    service: "Search"
  };
}

function buildCompareCardEl(item, isWinner, allItems) {
  const card = document.createElement("div");
  card.className = "compare-card" + (isWinner ? " is-winner" : "");

  const nicheLabels = item.niches
    .map(k => NICHES.find(n => n.key === k)?.label)
    .filter(Boolean)
    .join(" · ");

  const primary = primaryWatchUrl(item);

  card.innerHTML = `
    <div class="compare-card__poster">
      ${isWinner && allItems.length > 1 ? '<span class="winner-ribbon">Tonight’s pick</span>' : ""}
      <img src="${item.poster}" alt="${escapeHtml(item.title)} poster" loading="lazy" />
      <a class="watch-now" href="${primary.url}" target="_blank" rel="noopener noreferrer"
         aria-label="Watch ${escapeHtml(item.title)} on ${escapeHtml(primary.service)}">
        <span class="watch-now__play">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
        </span>
        <span class="watch-now__label">
          Watch now
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M7 17 17 7M7 7h10v10"/>
          </svg>
        </span>
        <span class="watch-now__service">on ${escapeHtml(primary.service)}</span>
      </a>
    </div>
    <div class="compare-card__body">
      <h4 class="compare-card__title">${escapeHtml(item.title)}</h4>
      <p class="compare-card__niches">${escapeHtml(nicheLabels)} · ${item.year}</p>

      <div class="compare-card__row">
        <span class="label">Runtime</span>
        <span class="value">${escapeHtml(item.runtime)}</span>
      </div>

      <div class="compare-card__row">
        <span class="label">Ratings</span>
        <span class="value">
          <span class="score-pair">
            <span class="score score--imdb">IMDb ★ ${item.imdb.toFixed(1)}</span>
            <span class="score score--rt">Rotten Tomatoes ${item.rt}%</span>
          </span>
        </span>
      </div>

      <div class="compare-card__row">
        <span class="label">Watch on (IN)</span>
        <span class="value">
          <span class="compare-card__ott">
            ${item.ott.map(p => ottChip(p, item.title)).join("")}
          </span>
        </span>
      </div>

      ${item.tags && item.tags.length
        ? `<div class="compare-card__tags">
             ${item.tags.map(t => `<span class="tag-chip">${escapeHtml(t)}</span>`).join("")}
           </div>`
        : ""}
    </div>
  `;
  return card;
}

// ---------- Keyboard shortcuts ----------
document.addEventListener("keydown", (e) => {
  if (!document.querySelector(".screen--swipe.is-active")) return;
  if (e.key === "ArrowRight") handleSwipe("like");
  if (e.key === "ArrowLeft")  handleSwipe("reject");
});
