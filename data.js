// Pickflix curated dataset — 40 titles tagged by niche.
// Every poster URL is verified against TMDB's public CDN at build time.
// `niches` controls which buckets a title appears in.

const TMDB = "https://image.tmdb.org/t/p/w500";

// Niche definitions — used by the genre grid + filtering.
const NICHES = [
  { key: "rom-com",      label: "Rom Com",            sub: "Light, swoony, easy" },
  { key: "mystery",      label: "Mystery & Thriller", sub: "Twists, who-dun-its" },
  { key: "crime",        label: "Crime Drama",        sub: "Gritty, high-stakes" },
  { key: "scifi",        label: "Mind-Bending Sci-Fi", sub: "Big ideas, bigger twists" },
  { key: "feelgood",     label: "Feel-Good",          sub: "Comfort watch energy" },
  { key: "action",       label: "Action Packed",      sub: "Pulse-on-max blockbusters" }
];

// OTT services — chip styling + deep-search link template.
// {q} is replaced with the URL-encoded title at render time.
const OTT_SERVICES = {
  "Netflix":          { color: "#E50914", url: "https://www.netflix.com/in/search?q={q}" },
  "Prime Video":      { color: "#00A8E1", url: "https://www.primevideo.com/region/eu/search/?phrase={q}" },
  "Disney+ Hotstar":  { color: "#1F80E0", url: "https://www.hotstar.com/in/search?q={q}" },
  "Apple TV+":        { color: "#000000", url: "https://tv.apple.com/in/search?term={q}" },
  "JioCinema":        { color: "#9D2DEA", url: "https://www.jiocinema.com/search/{q}" },
  "Lionsgate Play":   { color: "#1A1A1A", url: "https://www.lionsgateplay.com/search?q={q}" },
  "SonyLIV":          { color: "#3838BB", url: "https://www.sonyliv.com/search?q={q}" }
};

const CATALOG = [
  // ============ ACTION PACKED ============
  {
    id: 1, title: "John Wick", type: "movie",
    niches: ["action"],
    runtime: "1h 41m", imdb: 7.4, rt: 86, year: 2014,
    poster: TMDB + "/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg",
    ott: ["Prime Video", "Lionsgate Play"], tags: ["Popular"],
    blurb: "An ex-hitman comes out of retirement to hunt the gangsters who took everything from him."
  },
  {
    id: 2, title: "Mad Max: Fury Road", type: "movie",
    niches: ["action"],
    runtime: "2h 0m", imdb: 8.1, rt: 97, year: 2015,
    poster: TMDB + "/hA2ple9q4qnwxp3hKVNhroipsir.jpg",
    ott: ["JioCinema"], tags: ["Critic favourite"],
    blurb: "In a post-apocalyptic wasteland, a drifter teams up with a renegade to flee a tyrant."
  },
  {
    id: 3, title: "The Dark Knight", type: "movie",
    niches: ["action", "crime"],
    runtime: "2h 32m", imdb: 9.0, rt: 94, year: 2008,
    poster: TMDB + "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    ott: ["JioCinema", "Prime Video"], tags: ["All-time great"],
    blurb: "Batman raises the stakes in his war on crime when a criminal mastermind known as the Joker emerges."
  },
  {
    id: 4, title: "Inception", type: "movie",
    niches: ["scifi", "action"],
    runtime: "2h 28m", imdb: 8.8, rt: 87, year: 2010,
    poster: TMDB + "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    ott: ["Prime Video"], tags: ["All-time great"],
    blurb: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea."
  },
  {
    id: 5, title: "The Boys", type: "show",
    niches: ["action"],
    runtime: "4 seasons · ~1h per ep", imdb: 8.7, rt: 93, year: 2019,
    poster: TMDB + "/stTEycfG9928HYGEISBFaG1ngjM.jpg",
    ott: ["Prime Video"], tags: ["Trending"],
    blurb: "A group of vigilantes set out to take down corrupt superheroes who abuse their powers."
  },
  {
    id: 6, title: "Money Heist", type: "show",
    niches: ["action", "crime"],
    runtime: "5 parts · ~50m per ep", imdb: 8.2, rt: 78, year: 2017,
    poster: TMDB + "/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg",
    ott: ["Netflix"], tags: ["Popular"],
    blurb: "Eight thieves take hostages and lock themselves in the Royal Mint of Spain as a criminal mastermind manipulates the police."
  },
  {
    id: 7, title: "Reacher", type: "show",
    niches: ["action", "mystery"],
    runtime: "3 seasons · ~50m per ep", imdb: 8.0, rt: 92, year: 2022,
    poster: TMDB + "/o89IWxO590P30S976QvyjFfOir1.jpg",
    ott: ["Prime Video"], tags: ["New"],
    blurb: "A veteran military police investigator drifts into small towns and uncovers conspiracies."
  },

  // ============ MYSTERY & THRILLER ============
  {
    id: 8, title: "Knives Out", type: "movie",
    niches: ["mystery", "feelgood"],
    runtime: "2h 10m", imdb: 7.9, rt: 97, year: 2019,
    poster: TMDB + "/pThyQovXQrw2m0s9x82twj48Jq4.jpg",
    ott: ["Prime Video"], tags: ["Crowd-pleaser"],
    blurb: "A detective investigates the death of a patriarch of an eccentric, combative family."
  },
  {
    id: 9, title: "Andhadhun", type: "movie",
    niches: ["mystery"],
    runtime: "2h 19m", imdb: 8.2, rt: 100, year: 2018,
    poster: TMDB + "/dy3K6hNvwE05siGgiLJcEiwgpdO.jpg",
    ott: ["Netflix"], tags: ["Crowd-pleaser"],
    blurb: "A series of mysterious events change the life of a blind pianist who must now report a crime he has only sensed."
  },
  {
    id: 10, title: "Gone Girl", type: "movie",
    niches: ["mystery"],
    runtime: "2h 29m", imdb: 8.1, rt: 87, year: 2014,
    poster: TMDB + "/ts996lKsxvjkO2yiYG0ht4qAicO.jpg",
    ott: ["Disney+ Hotstar"], tags: ["Critic favourite"],
    blurb: "With his wife's disappearance becoming the focus of intense media attention, a man finds himself the prime suspect."
  },
  {
    id: 11, title: "Parasite", type: "movie",
    niches: ["mystery", "crime"],
    runtime: "2h 12m", imdb: 8.5, rt: 99, year: 2019,
    poster: TMDB + "/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    ott: ["Prime Video"], tags: ["Critic favourite"],
    blurb: "A poor family schemes to become employed by a wealthy household — until the deception spirals."
  },
  {
    id: 12, title: "Drishyam", type: "movie",
    niches: ["mystery", "crime"],
    runtime: "2h 43m", imdb: 8.2, rt: 85, year: 2015,
    poster: TMDB + "/99pbvC8UDWWAaFOO2GqAJv1woDw.jpg",
    ott: ["Prime Video"], tags: ["Crowd-pleaser"],
    blurb: "A man goes to extreme lengths to save his family from punishment after they accidentally commit a crime."
  },
  {
    id: 13, title: "Mindhunter", type: "show",
    niches: ["mystery", "crime"],
    runtime: "2 seasons · ~50m per ep", imdb: 8.6, rt: 96, year: 2017,
    poster: TMDB + "/fbKE87mojpIETWepSbD5Qt741fp.jpg",
    ott: ["Netflix"], tags: ["Critic favourite"],
    blurb: "Two FBI agents broaden the realm of criminal science by investigating the psychology of murder."
  },
  {
    id: 14, title: "You", type: "show",
    niches: ["mystery"],
    runtime: "5 seasons · ~45m per ep", imdb: 7.7, rt: 84, year: 2018,
    poster: TMDB + "/oANi0vEE92nuijiZQgPZ88FSxqQ.jpg",
    ott: ["Netflix"], tags: ["Trending"],
    blurb: "A dangerously charming, intensely obsessive young man goes to extreme measures to insert himself into the lives of those he is transfixed by."
  },

  // ============ CRIME DRAMA ============
  {
    id: 15, title: "The Departed", type: "movie",
    niches: ["crime"],
    runtime: "2h 31m", imdb: 8.5, rt: 91, year: 2006,
    poster: TMDB + "/nT97ifVT2J1yMQmeq20Qblg61T.jpg",
    ott: ["JioCinema"], tags: ["All-time great"],
    blurb: "An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang."
  },
  {
    id: 16, title: "Pulp Fiction", type: "movie",
    niches: ["crime"],
    runtime: "2h 34m", imdb: 8.9, rt: 92, year: 1994,
    poster: TMDB + "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    ott: ["JioCinema"], tags: ["All-time great"],
    blurb: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption."
  },
  {
    id: 17, title: "Breaking Bad", type: "show",
    niches: ["crime"],
    runtime: "5 seasons · ~50m per ep", imdb: 9.5, rt: 96, year: 2008,
    poster: TMDB + "/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
    ott: ["Netflix"], tags: ["All-time great"],
    blurb: "A high school chemistry teacher diagnosed with cancer turns to manufacturing meth to secure his family's future."
  },
  {
    id: 18, title: "Mirzapur", type: "show",
    niches: ["crime"],
    runtime: "3 seasons · ~50m per ep", imdb: 8.4, rt: 80, year: 2018,
    poster: TMDB + "/zU0htwkhNvBQdVSIKB9s6hgVeFK.jpg",
    ott: ["Prime Video"], tags: ["Popular"],
    blurb: "A shocking incident at a wedding procession ignites a series of events entangling families in a quest for power."
  },
  {
    id: 19, title: "Sacred Games", type: "show",
    niches: ["crime", "mystery"],
    runtime: "2 seasons · ~50m per ep", imdb: 8.5, rt: 85, year: 2018,
    poster: TMDB + "/in1R2dDc421JxsoRWaIIAqVI2KE.jpg",
    ott: ["Netflix"], tags: ["Critic favourite"],
    blurb: "A police officer in Mumbai is contacted by a fugitive gangster who threatens an attack on the city in 25 days."
  },

  // ============ MIND-BENDING SCI-FI ============
  {
    id: 20, title: "Interstellar", type: "movie",
    niches: ["scifi"],
    runtime: "2h 49m", imdb: 8.7, rt: 73, year: 2014,
    poster: TMDB + "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    ott: ["Prime Video"], tags: ["Crowd-pleaser"],
    blurb: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
  },
  {
    id: 21, title: "Arrival", type: "movie",
    niches: ["scifi"],
    runtime: "1h 56m", imdb: 7.9, rt: 94, year: 2016,
    poster: TMDB + "/x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg",
    ott: ["JioCinema"], tags: ["Critic favourite"],
    blurb: "A linguist works with the military to communicate with alien lifeforms after twelve mysterious spacecraft appear around the world."
  },
  {
    id: 22, title: "Stranger Things", type: "show",
    niches: ["scifi"],
    runtime: "4 seasons · ~50m per ep", imdb: 8.7, rt: 92, year: 2016,
    poster: TMDB + "/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
    ott: ["Netflix"], tags: ["Popular"],
    blurb: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces."
  },
  {
    id: 23, title: "Severance", type: "show",
    niches: ["scifi", "mystery"],
    runtime: "2 seasons · ~1h per ep", imdb: 8.7, rt: 97, year: 2022,
    poster: TMDB + "/lFf6LLrQjYldcZItzOkGmMMigP7.jpg",
    ott: ["Apple TV+"], tags: ["Trending"],
    blurb: "Mark leads a team of office workers whose memories have been surgically divided between their work and personal lives."
  },
  {
    id: 24, title: "Black Mirror", type: "show",
    niches: ["scifi"],
    runtime: "7 seasons · ~1h per ep", imdb: 8.7, rt: 84, year: 2011,
    poster: TMDB + "/7PRddO7z7mcPi21nZTCMGShAyy1.jpg",
    ott: ["Netflix"], tags: ["Critic favourite"],
    blurb: "An anthology series exploring a twisted, high-tech multiverse where humanity's greatest innovations and darkest instincts collide."
  },
  {
    id: 25, title: "Dark", type: "show",
    niches: ["scifi", "mystery"],
    runtime: "3 seasons · ~50m per ep", imdb: 8.7, rt: 95, year: 2017,
    poster: TMDB + "/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg",
    ott: ["Netflix"], tags: ["Critic favourite"],
    blurb: "A family saga with a supernatural twist, set in a German town, where the disappearance of two children exposes secrets."
  },

  // ============ FEEL-GOOD ============
  {
    id: 26, title: "The Grand Budapest Hotel", type: "movie",
    niches: ["feelgood"],
    runtime: "1h 39m", imdb: 8.1, rt: 92, year: 2014,
    poster: TMDB + "/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg",
    ott: ["Disney+ Hotstar"], tags: ["Critic favourite"],
    blurb: "A legendary concierge at a famous European hotel and his protégé become involved in a stolen painting caper."
  },
  {
    id: 27, title: "3 Idiots", type: "movie",
    niches: ["feelgood"],
    runtime: "2h 50m", imdb: 8.4, rt: 100, year: 2009,
    poster: TMDB + "/66A9MqXOyVFCssoloscw79z8Tew.jpg",
    ott: ["Prime Video"], tags: ["All-time great"],
    blurb: "Two friends search for their long-lost college buddy and recall the hilarious days they spent together."
  },
  {
    id: 28, title: "Paddington 2", type: "movie",
    niches: ["feelgood"],
    runtime: "1h 43m", imdb: 7.8, rt: 99, year: 2017,
    poster: TMDB + "/1OJ9vkD5xPt3skC6KguyXAgagRZ.jpg",
    ott: ["Netflix"], tags: ["Comfort watch"],
    blurb: "Paddington picks up a series of odd jobs to buy the perfect present for his Aunt Lucy, but it is stolen."
  },
  {
    id: 29, title: "Ted Lasso", type: "show",
    niches: ["feelgood"],
    runtime: "3 seasons · ~30m per ep", imdb: 8.8, rt: 91, year: 2020,
    poster: TMDB + "/bhY5Rea4kJWo9asSGkmRR3ymImb.jpg",
    ott: ["Apple TV+"], tags: ["Critic favourite"],
    blurb: "An American football coach is hired to manage a British soccer team, despite having no experience."
  },
  {
    id: 30, title: "Brooklyn Nine-Nine", type: "show",
    niches: ["feelgood"],
    runtime: "8 seasons · ~22m per ep", imdb: 8.4, rt: 97, year: 2013,
    poster: TMDB + "/hgRMSOt7a1b8qyQR68vUixJPang.jpg",
    ott: ["Netflix", "Prime Video"], tags: ["Comfort watch"],
    blurb: "A talented but immature detective and his diverse colleagues solve cases under a strict captain."
  },
  {
    id: 31, title: "Panchayat", type: "show",
    niches: ["feelgood"],
    runtime: "3 seasons · ~30m per ep", imdb: 8.9, rt: 100, year: 2020,
    poster: TMDB + "/hockjsCBN59cZ1EpuLdz98v8LOo.jpg",
    ott: ["Prime Video"], tags: ["Trending"],
    blurb: "An engineering graduate joins as a panchayat secretary in a remote village out of lack of better job options."
  },
  {
    id: 32, title: "Schitt's Creek", type: "show",
    niches: ["feelgood"],
    runtime: "6 seasons · ~22m per ep", imdb: 8.5, rt: 93, year: 2015,
    poster: TMDB + "/1M876KPjulVwppEpldhdc8V4o68.jpg",
    ott: ["Netflix"], tags: ["Comfort watch"],
    blurb: "A formerly wealthy family loses everything but each other and must rebuild their lives in a small town they once owned."
  },

  // ============ ROM COM ============
  {
    id: 33, title: "La La Land", type: "movie",
    niches: ["rom-com"],
    runtime: "2h 8m", imdb: 8.0, rt: 91, year: 2016,
    poster: TMDB + "/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
    ott: ["Prime Video"], tags: ["Crowd-pleaser"],
    blurb: "A jazz pianist falls for an aspiring actress in Los Angeles as their dreams pull them in different directions."
  },
  {
    id: 34, title: "Crazy Rich Asians", type: "movie",
    niches: ["rom-com", "feelgood"],
    runtime: "2h 1m", imdb: 6.9, rt: 91, year: 2018,
    poster: TMDB + "/khJo0VTt1uDHOqgI4igXHNPj2LW.jpg",
    ott: ["Prime Video"], tags: ["Crowd-pleaser"],
    blurb: "An American-born Chinese economics professor accompanies her boyfriend to Singapore to meet his ultra-wealthy family."
  },
  {
    id: 35, title: "Notting Hill", type: "movie",
    niches: ["rom-com", "feelgood"],
    runtime: "2h 4m", imdb: 7.2, rt: 84, year: 1999,
    poster: TMDB + "/hHRIf2XHeQMbyRb3HUx19SF5Ujw.jpg",
    ott: ["Prime Video"], tags: ["Comfort watch"],
    blurb: "A bookstore owner's life takes an unexpected turn when he meets a famous American actress in his small London neighborhood."
  },
  {
    id: 36, title: "Pride & Prejudice", type: "movie",
    niches: ["rom-com"],
    runtime: "2h 9m", imdb: 7.8, rt: 87, year: 2005,
    poster: TMDB + "/o8UhmEbWPHmTUxP0lMuCoqNkbB3.jpg",
    ott: ["Netflix"], tags: ["Comfort watch"],
    blurb: "Sparks fly between spirited Elizabeth Bennet and the proud Mr. Darcy in 19th-century England."
  },
  {
    id: 37, title: "Heartstopper", type: "show",
    niches: ["rom-com", "feelgood"],
    runtime: "3 seasons · ~30m per ep", imdb: 8.7, rt: 100, year: 2022,
    poster: TMDB + "/pRtJagIxpfODzzb0T0NAvZSzErC.jpg",
    ott: ["Netflix"], tags: ["Trending"],
    blurb: "A coming-of-age story about boy meets boy, navigating high school, friendship, and falling in love."
  },
  {
    id: 38, title: "Bridgerton", type: "show",
    niches: ["rom-com"],
    runtime: "3 seasons · ~1h per ep", imdb: 7.3, rt: 87, year: 2020,
    poster: TMDB + "/luoKpgVwi1E5nQsi7W0UuKHu2Rq.jpg",
    ott: ["Netflix"], tags: ["Popular"],
    blurb: "Wealth, lust, and betrayal set against the backdrop of Regency-era England, seen through the eyes of the powerful Bridgerton family."
  },
  {
    id: 39, title: "Normal People", type: "show",
    niches: ["rom-com"],
    runtime: "1 season · ~30m per ep", imdb: 8.4, rt: 91, year: 2020,
    poster: TMDB + "/h4OwXzpHC7CeqiuVNyloiVfYBIi.jpg",
    ott: ["JioCinema"], tags: ["Critic favourite"],
    blurb: "Two young people from different walks of life navigate an intense bond from their school days through university."
  },
  {
    id: 40, title: "Emily in Paris", type: "show",
    niches: ["rom-com", "feelgood"],
    runtime: "4 seasons · ~30m per ep", imdb: 6.9, rt: 64, year: 2020,
    poster: TMDB + "/zB9aeOEnPcXIc9LT5ZLtPeyTnDO.jpg",
    ott: ["Netflix"], tags: ["Popular"],
    blurb: "A young American woman from the Midwest is hired by a marketing firm in Paris to provide them with an American perspective."
  }
];
