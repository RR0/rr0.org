# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

RR0 is both a **software project** (TypeScript/JS packages published on npm) and a **documentary project** (HTML content pages): together they form a French-language encyclopaedic website on topics of interest — fringe subjects (ufology, paranormal) and scientific ones (physics, astrophysics, philosophy of science). The editorial stance is strictly objective and factual; no opinion is expressed without verifiable sourcing.

The repository contains both **content** (HTML pages as semantic data) and **build tooling** (TypeScript) backed by a custom Static Site Generator (SSG).

### Typical update workflow

1. Edit one or more HTML content pages.
2. Regenerate the site: `npm run build`
3. Publish: `npm run deploy`

Content authors focus only on semantic content. All navigation, layout, links, and index pages are produced automatically during `npm run build`.

## Commands

```bash
# Install dependencies
npm install

# Build the site (outputs to out/)
GOOGLE_MAPS_API_KEY=<key> npm run build

# Build and rebuild search/source indexes
GOOGLE_MAPS_API_KEY=<key> npm run build -- --reindex search,sources

# Full rebuild (rm -rf out/ first)
GOOGLE_MAPS_API_KEY=<key> npm run rebuild

# Run all tests
npm test

# Run a single test (edit test-one in package.json first)
npm run test-one

# Deploy to Netlify
npm run deploy
```

`GOOGLE_MAPS_API_KEY` is required to run `build`. Build args can also be passed via `--config build.json`.

## Architecture

### Data-centric design

HTML pages **are** the data. They contain semantic markup only — no presentation logic. The SSG reads those pages, replaces semantic tags with fully rendered HTML, and writes the result to `out/`.

Display is driven by parsing semantic tags/classes/attributes, and rendering is **contextual**: a `<time>` tag inherits the surrounding date context set by previous tags on the same page.

### SSG pipeline (`build.ts` → `@rr0/cms` → `ssg-api`)

Steps executed in order:
1. **Include step** — inlines headers/footers (SSI-style)
2. **Directory steps** — generates index pages for UFO cases and people
3. **Content step** — runs replacers over every content page
4. **Books directory** — generates book TOCs
5. **Search index rebuild** — writes `search/index.json`
6. **Sources index rebuild** — writes `source/index.json`
7. **Copy step** — copies CSS, JS, assets to `out/`

### Content replacers

During the content step, special tags are transformed:

- **`<time datetime="...">` / `<time>`** — renders full human-readable dates (day of week, locale) with links to time
  pages. Supports ISO 8601 intervals (`1952-07-01/03`, `1947/2026`) and durations (`P1D`, `P15M`). Sets a contextual
  date so subsequent relative `<time>` tags resolve correctly. **All date ranges in text must use `<time>` with `/`
  separator** — never write `1947-2026` as plain text.
- **`<span class="place">City (Country)</span>`** — adds a click-to-map link via Google Maps Geocoding API.
- **`<span class="people">First Last</span>`** — links to the person's bio page under `/people/`. Auto-renders subsequent mentions of the same last name.
- **`<a class="source" href="https://...">label</a>`** — external source citation.
- **`<a class="source" href="/internal/page.html"></a>`** — internal source (empty link body; rendered automatically from the target page metadata).
- **`<code>`** — syntax highlighted code blocks.
- **`<span class="temoin*">`** — witness rendering.
- **`<span class="indexed">`** — indexed item rendering.
- Units — SI unit expressions.

### Content authoring conventions

These rules apply when writing or editing any HTML content page:

**Abbreviations and acronyms** — always use `<abbr>`:
```html
<abbr title="Federal Bureau of Investigation">FBI</abbr>
```
Prefer the abbreviated form over the full name in running text. If a dedicated page exists for the organisation or concept, link the abbreviation to it:
```html
<a href="/org/us/ic/fbi"><abbr title="Federal Bureau of Investigation">FBI</abbr></a>
```

**Never write the expansion in the surrounding text when `<abbr title="...">` is already present** — the `title`
attribute is the expansion. Writing both is redundant and forbidden:

```html
<!-- WRONG -->
<abbr title="Federal Bureau of Investigation">FBI</abbr> (Federal Bureau of Investigation)
<!-- CORRECT -->
<abbr title="Federal Bureau of Investigation">FBI</abbr>
```

**Foreign-language terms** — any word, phrase, or passage that is not French must be wrapped in `<i lang="...">`:
```html
<i lang="en">close encounter</i>
```

Never use `<em>` for a foreign term: `<em>` is emphasis, not language. This includes names of organisations, book,
journal and article titles (`<i lang="en">Congressional Research Service</i>`, `<i lang="en">Forbidden Science</i>`),
and foreign quotes carry the language too: `<q lang="en">…</q>`.

**Hyperlinks** — if a term, concept, person, place, or organisation mentioned in the text has a dedicated RR0 page, it must always be linked. Do not leave known terms unlinked.

**No restating** — what a linked page defines is not redefined in the page that links to it: the reader follows the
link if interested. E.g. "il relève des rencontres rapprochées du <a href=".../rr/2/">2ᵉ</a> ou du
<a href=".../rr/3/">3ᵉ type</a>", not "du 2ᵉ type quand il laisse des traces, du 3ᵉ type quand des occupants sont
décrits". Link the most specific page (`rr/2`, `rr/3` rather than `rr/`).

**External project links** — when RR0 has a dedicated page for an external project/tool (e.g. its own GitHub repo, like `science/crypto/ufo/enquete/projet/UfoAtHome.html`), only that dedicated page should link directly to the external URL (GitHub, npm, etc.). Every other mention of that project anywhere else on the site must link to the dedicated RR0 page instead, not to the external URL directly.

**People references** — a person is always referenced with `<span class="people">First Last</span>`, never with an
`<a href="/people/...">` link: the build resolves the URL, the portrait preview on hover and the descriptive `title`.
When the displayed text differs from the resolvable name (nickname, short form), give the full name in `title`:
`<span class="people" title="Thomas G. Belden">Tom Belden</span>`.

**People pages** — a biography should have a `people.json` next to its `index.html`, holding names, occupations,
countries and `events` (`birth`, `death`, `image`…). Each event's `place` is a plain string
(`"place": "Peoria (Illinois)"`), not an object, and carries its own `sources` whenever possible (especially for a
death). With a `people.json`, the page starts with `<!--#include virtual="/header.html" -->` alone (the build generates
the title, the default portrait and the birth/death statements from the JSON), and the text continues right after the
birth: never restate the birth or the death in the HTML. Nor restate the name at the start of the text: the title shows
it, and the generated birth statement already uses the `surname` (nickname, e.g. `"surname": "Tom"`) if present, else
the name. Start with what follows, e.g. `<p>Ingénieur de formation, il…</p>`.

**Placing a paragraph** — a paragraph must be relevant to the title of its section, and ordered chronologically against
the dates cited before and after it (e.g. "at the end of the 1980s" goes after a paragraph starting in 1984, not
before). A paragraph fitting no section goes before the first section (right after the generated birth statement on a
people page) or in a new, properly titled section. When inserting, read the whole section around the insertion point
first; when a date is vague, look for the exact one (it often decides the placement).

**Talking about a document** — don't restate its title in the text: say what the document is, what it contains, its
role, and reference it in a source tag (where the title belongs). E.g. "he wrote a biography of X <source 1>, then one
of Y <source 2>", not "he wrote *Title One* about X".

**French typography** — high punctuation is preceded by a non-breaking Unicode space, never a plain space: U+00A0
(no-break space) before `:`, U+202F (narrow no-break space) before `;`, `?`, `!`. Not in English text nor in source
citations (`Author: Title`).

**Organisation pages** — place an organisation under the one it depends on (e.g. a contractor created for and mainly
funded by the DoD goes under `org/us/dod/`, not `org/us/`), as a directory with `index.html` + `index.json`
(`{"type": "org", "title": "<acronym>"}`), the page starting with `<!--#include virtual="/header.html" -->`.

**Encoding** — every file is UTF-8, without BOM. A file found in Latin-1, Windows-1252 or any other encoding is
converted (decode Windows-1252 for Latin-1 files: it is a superset, and old pages use its `’ “ ” … –`), and any charset
declaration it carries (`<meta ... charset=iso-8859-1>`, `<?xml encoding=...?>`) is changed to UTF-8. Check with
`iconv -f utf-8 -t utf-8 <file> >/dev/null`.

**Entities** — write a plain `&` rather than `&amp;` wherever the parser accepts it (e.g.
`Belden, Thomas G. & Belden, Marva R.`).

**Event keys in `people.json`** — an event's date is `"time"`, never `"date"` (a `"date"` key is silently ignored and
the build then asserts `Event of type "event" has no time for paragraph`). A source's authors are `"authors": [...]`
and its publication date `"publication": {"publisher": ..., "time": ...}`.

**Sources** — every claim must be supported by a source. Use `<a class="source">` for citations (see replacers above),
with these caveats:

- An external `<a class="source" href="https://...">` **ignores its content**: the build fetches the page and uses its
  `<title>`. If the site blocks bots (403, e.g. academic.oup.com, cia.gov) the source renders empty, or the build
  crashes; if the page title is poor, so is the source. For a precise citation, or such sites, write
  `<span class="source">Author: <a href="https://...">Title</a>, Publication, <time data-context="none">1977-03</time></span>`,
  whose content is kept as is.
- A `<time>` inside a source must carry `data-context="none"`: otherwise it is rendered relative to the previous date of
  the page and loses its year ("août" instead of "août 1956").
- After building, read the rendered sources in `out/` to check none is empty or mistitled.

**Citing someone's work in their bio** — the form depends on where it goes:

- In running text (a paragraph), the work is a source: `<a class="source" href="/time/…/index.html"></a>`, empty
  body.
- In a list of works or references (e.g. an "Auteur de" list), the item is the work's title as a direct hyperlink, in
  the list's own format: `<li>"<a href="/time/…/index.html">Title</a>", <i lang="en">Book</i>, Publisher, date.</li>`.
- Prefer the text form: a sentence saying what the person did, with whom and to what end, sourced by the work
  ("In the late 2020s he works with YYY on xxx in order to zzz <source>"), adds more than a bare mention in a list.
  Add the list item as well when the bio has such a list.

**Dates in text** — every date is a `<time>` whose content is the ISO value, never a `datetime` attribute with free
text: `<time>2010-08-11</time>`, not `<time datetime="2010-08-11">August 11, 2010</time>`, so that a copy that does
not resolve `<time>` stays readable (the build renders it in the page's language). This includes dates spelled out in
the text ("August 16", "on the 15th") and ranges, which are a single interval: `<time>1989/1994</time>`, not two
tags. It renders "de 1989 à 1994" after "de" and "entre 1989 et 1994" after "entre" (likewise "from … to" /
"between … and" in English), so keep the natural preposition. Since a `<time>` renders
relative to the previous one ("la veille", "l'année suivante"), read the rendered page and use `data-context="none"`
where a relative rendering breaks the sentence.

A moment EDTF cannot express stays a `<time>` but with `data-format="none"`, so that it is not interpreted:
`<time data-format="none">Dans la nuit</time>`, `<time data-format="none">Fin du mois</time>`. Convert it
instead whenever EDTF can say it: a season is `YYYY-21` (spring) to `YYYY-24` (winter), rendered "automne 1954";
a day or month needs its year (`<time>1947-09-18</time>`, not `<time>09-18</time>`). A `<time>` only ever holds a
moment: a name, a place or a title is never one (`<span class="people">`, `<span class="place">`, `<i>`).

Within a dated context (a day page, or after a full date), the build completes partial values from the previous
`<time>`: `<time>19</time>` is the 19th of the current month, `<time>21:00</time>` an hour of the current day,
`<time>1517-05-22 21:00/22:00</time>` ends the same day and `23:00/03:00` the next one. Hour ranges use `/`, never
`-` (`21:00-22:00` reads as a time zone offset); midnight is `00:00`, not `24:00`; a duration range is
`<time>P10M/12M</time>`. Words around a value are kept as written: `<time>vers 21:00</time>`, and after a date or
day with a `T`, `<time>1964-04-27Tle soir</time>`, `<time>18Tla nuit</time>` (a bare number followed by words,
like "1 h après", is never read as a time).

**Metadata, not text** — the page header and every citation are generated from the `author` (one meta per author,
repeated), `copyright` and date metas: fill them rather than writing "Edited by X and Y, © Publisher" in the text.

**Unique titles** — no two pages of the site may share a `<title>` (the search index fails on duplicates). A generic
title (a book part, "Introduction", "Foreword") gets a distinguishing suffix, e.g. `Case Studies (Ballester-Olmos &
Heiden)`.

**Epigraphs** — a quotation set as an epigraph (at the head of a page, chapter or section, or a book's dedication) is
a `<p class="exergue">quote <cite>Author</cite></p>`. Keep `<blockquote>` for longer quoted texts and dialogues, and
`<q>` for quotes within a sentence. Don't add `<em>` inside a blockquote to italicize it: its style already does.
An epigraph is always in the language of its page, even when the document prints it in another one: translate it
(using the document's own translation when it gives one) and keep the original in a note of the `<cite>`:
`<p class="exergue">For Lucas: you were born small… <cite>V.J. Ballester-Olmos<span class="note">Original Spanish:
<i lang="es">Para Lucas: naciste pequeño…</i></span></cite></p>`.

**Inline quotes** — `<q>…</q>` is only for words someone actually said or wrote (a witness's "ovoïde" or "100 m",
an author's sentence, a newspaper's wording), without typing the quotation marks: the style adds them, so write
`<q>Je soupçonne une fabrication</q>`. Everything else keeps typed quotation marks (`« … »` in French, `“…”` in
English) and no `<q>`:

- a term put at a distance or stressed ("experts", "son" cas), a general expression ("poursuite d'ovni", "cas de
  Manises");
- a title of a work or programme, which is `<i>` instead (`<i>Cinéma de minuit</i>`);
- words in another language than the page's, which are `<i lang="…">` (`<i lang="es">La pocilga y el ovni</i>`),
  unless they are part of a quotation already inside a `<q>`.

**Filterable tags** — any block-level content element (typically `<li>`, `<p>`, or `<section>`) inside `.contents` may
carry one or more `tag-<slug>` classes. Slugs are always in English, like every other identifier in this codebase (e.g.
`tag-ufology`, `tag-astrophysics`), even though the page content itself is French — only the tag *label* shown to the
reader is localized. The nav's `<rr0-tags>` widget (`tag/TagsComponent.mjs`) collects the tags present on the page, lets
the reader toggle them on/off (hiding/showing the matching elements, selection remembered across pages via
`localStorage`) and preview them on hover. Known slugs are translated in `tag/messages/TagsMessages_<lang>.mjs`;
unlisted slugs fall back to an auto-humanized version of the slug. Do not reuse existing single-purpose classes
(`source`, `people`, `place`, `note`, `event`, `temoin*`, `indexed`) as tags — always prefix with `tag-`. When tagging
an item that already carries the older `class="tech"` marker (a square-bullet marker for spaceflight/space-tech news
predating the tag system), replace it with `tag-spaceflight` rather than keeping both — `rr0.css` styles
`.tag-spaceflight` with the same square bullet, so nothing is lost visually.

**Immutable original documents** — articles and documents often exist in both their original language and a French translation, e.g.:
- `article/index.html` — original (immutable)
- `article/index_fr.html` — French translation

Never modify the original to reflect new information. If a clarification or update is necessary, add a note using `<span class="note">content</span>`, which is the only acceptable augmentation of immutable documents.

### Directory structure for content

| Path | Content |
| :--- | :--- |
| `time/[d1]/[d2]/[d3]/[d4]/[MM]/[DD]/index.html` | Chronological facts (year digits split per directory level) |
| `people/[A-Z]/[LastNameFirstName]/index.html` | Biographies indexed by last name initial |
| `science/crypto/ufo/enquete/dossier/[CaseName]/` | UFO case studies |
| `org/` | Organizations (countries, companies, agencies) |
| `place/` | Geographical places |
| `croyance/` | Religion, belief systems, conspiracy theories |
| `tech/` | Technology topics |
| `source/` | Source citation styles; `index.json` caches source metadata |
| `search/` | Search component; `index.json` is the generated full-text index |

### Key packages

- **`@rr0/cms`** — CMS-layer: `CMSGenerator`, all replacer factories, `RR0Context`, `HtmlRR0Context`, time/org/people services
- **`@rr0/data`** — Data factories: `PeopleFactory`, `CaseFactory`, `EventDataFactory`, `AllDataService`
- **`ssg-api`** — Core SSG framework providing `SsgContext`, `FileContents`, SSI replace commands
- **`@javarome/testscript`** — Test runner; tests use `describe`/`test`/`expect` from this package (not Jest, despite `jest.config.ts` being present)
- **`tsx`** — Runs TypeScript files directly (build, import scripts)

### Testing

Test utility `test/RR0TestUtil.ts` provides `rr0TestUtil.newHtmlContext(filePath, htmlString)` to create a full `HtmlRR0Context` for unit tests. Test files sit next to the code they test (`*.test.ts` / `*.test.js`).

To run a specific test, update the `test-one` script path in `package.json`, then run `npm run test-one`.

### Build configuration

`build.json` at root sets default CLI args (currently `reindex: ["search", "sources"]`). Can be overridden per-run via CLI flags:

```bash
npm run build -- --contents "time/**/*.html" --force true
```

### Deployment

Site is hosted on Netlify, and its configuration is BUILD OUTPUT, not a tracked file. `out/_redirects` is generated from `.htaccess` (plus `_redirects.head`, which holds what Apache cannot say: the ufoathome.org redirects, with their status and force). `out/_headers` is a copy of `_headers` and carries the sitewide CORS rule. Netlify reads both from the DEPLOYED directory, so neither has to be committed — unlike `netlify.toml`, which it reads from the clone before any build runs, and which this site no longer has. The publish directory and build command live in the Netlify project settings. Deploy with `npm run deploy` (calls `netlify deploy --prod --dir out`).
