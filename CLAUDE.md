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

- **`<time datetime="...">` / `<time>`** — renders full human-readable dates (day of week, locale) with links to time pages. Supports ISO 8601 intervals (`1952-07-01/03`) and durations (`P1D`, `P15M`). Sets a contextual date so subsequent relative `<time>` tags resolve correctly.
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

**Foreign-language terms** — any word, phrase, or passage that is not French must be wrapped in `<i lang="...">`:
```html
<i lang="en">close encounter</i>
```

**Hyperlinks** — if a term, concept, person, place, or organisation mentioned in the text has a dedicated RR0 page, it must always be linked. Do not leave known terms unlinked.

**Sources** — every claim must be supported by a source. Use `<a class="source">` for citations (see replacers above).

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

Site is hosted on Netlify. The `netlify.toml` defines the publish directory (`out/`) and legacy URL redirects. Deploy with `npm run deploy` (calls `netlify deploy --prod --dir out`).