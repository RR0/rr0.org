// Screenshots for the Medium article on UFO@home and AI, in English.
//   SITE=http://localhost:3002 node article-4-shots.mjs <outDir> [name ...]
// Runs a headed Chromium (WebGL), so outside a sandbox.
import { createRequire } from "node:module"
import { mkdirSync } from "node:fs"
import { join } from "node:path"

const require = createRequire(import.meta.url)
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "/Users/javarome/project/@javarome/thesteps2/node_modules/playwright")
const [outDir, ...wanted] = process.argv.slice(2)
mkdirSync(outDir, { recursive: true })
const SITE = process.env.SITE || "https://ufoathome.org"
const EDIT = `${SITE}/edit/index.html?file=/demo-data/observer-mission-viejo.json`

/** Defines window.__deep(root, test): every element passing `test`, through shadow roots. */
const DEEP = () => {
  window.__deep = (root, f, acc = []) => {
    root.querySelectorAll("*").forEach(e => { if (f(e)) acc.push(e); if (e.shadowRoot) window.__deep(e.shadowRoot, f, acc) })
    return acc
  }
}

/** Opens the event of the case of that kind, then (optionally) a group of its editor; a group tab toggles. */
async function open(page, kind, group) {
  await page.evaluate(DEEP)
  await page.evaluate(async ({ kind, group }) => {
    const card = window.__deep(document, e => e.matches(`li.event-card[data-kind=${kind}]`))[0]
    card?.querySelector(".event-open")?.click()
    await new Promise(r => setTimeout(r, 3500))
    if (!group) return
    const tab = window.__deep(document, e => e.getAttribute("aria-controls") === group && e.getBoundingClientRect().width > 0)[0]
    if (tab && tab.getAttribute("aria-expanded") !== "true" && tab.getAttribute("aria-selected") !== "true") tab.click()
    await new Promise(r => setTimeout(r, 1500))
  }, { kind, group })
}

/** The box of the first element passing `test` (a function source run in the page), in page coordinates, grown by `pad`. */
async function clip(page, test, pad = 12, extra = {}) {
  const b = await page.evaluate(({ test, extra }) => {
    const f = eval(test)
    const e = window.__deep(document, x => x.getBoundingClientRect().width > 0 && f(x))[0]
    if (!e) return null
    e.scrollIntoView({ block: "center" })
    const r = e.getBoundingClientRect()
    return { x: r.x + scrollX - (extra.left ?? 0), y: r.y + scrollY - (extra.above ?? 0), width: r.width + (extra.left ?? 0) + (extra.right ?? 0), height: r.height + (extra.above ?? 0) + (extra.below ?? 0) }
  }, { test, extra })
  if (!b) throw new Error("nothing matches " + test)
  return { x: Math.max(0, b.x - pad), y: Math.max(0, b.y - pad), width: b.width + 2 * pad, height: b.height + 2 * pad }
}

/** Scrolls the exchanges so that the first turn passing `test` stands in the middle of their frame, and frames that frame. */
async function framed(page, test) {
  const ok = await page.evaluate(async (test) => {
    const f = eval(test)
    const turn = window.__deep(document, e => e.matches(".turn") && f(e))[0]
    if (!turn) return false
    const frame = turn.closest(".rr0-interview-turns") ?? turn.parentElement
    frame.scrollTop += turn.getBoundingClientRect().top - frame.getBoundingClientRect().top - (frame.clientHeight - turn.offsetHeight) / 2
    frame.setAttribute("data-shot", "")
    await new Promise(r => setTimeout(r, 600))
    return true
  }, test)
  if (!ok) throw new Error("no turn passes " + test)
  return clip(page, `e => e.matches(".rr0-interview-turns[data-shot]")`, 4)
}

const SHOTS = [
  {
    // The drafting panel of the Summary group: the account in the witness's words, what drafts it, and the button. No key is entered.
    name: "drafting-panel", url: EDIT, async take(page) {
      await open(page, "observation", "group-observation")
      return clip(page, `e => e.matches(".toolbar.narrative")`, 12)
    }
  },
  {
    // The Create page: what to ask of an assistant that writes a recording from a case file.
    name: "create-with-ai", url: `${SITE}/docs/create/index.html`, async take(page) {
      await page.evaluate(DEEP)
      // From the heading down to the end of the prompt, nothing cut in between.
      return page.evaluate(() => {
        const h = [...document.querySelectorAll("h2")].find(e => /AI assistant/.test(e.textContent))
        const pre = h.parentElement.querySelector("pre.doc-prompt") ?? document.querySelector("pre.doc-prompt")
        const a = h.getBoundingClientRect(), b = pre.getBoundingClientRect()
        return { x: Math.min(a.x, b.x) + scrollX - 12, y: a.y + scrollY - 12, width: Math.max(a.right, b.right) - Math.min(a.x, b.x) + 24, height: b.bottom - a.y + 24 }
      })
    }
  },
]

const browser = await chromium.launch({ headless: false, args: ["--lang=en-US"] })
const context = await browser.newContext({ locale: "en-US", viewport: { width: 1200, height: 1500 }, deviceScaleFactor: 1.5 })
try {
  for (const shot of SHOTS) {
    if (wanted.length && !wanted.includes(shot.name)) continue
    const page = await context.newPage()
    const problems = []
    page.on("pageerror", e => problems.push(e.message))
    try {
      await page.goto(shot.url, { waitUntil: "load" })
      await page.addStyleTag({ content: "header, .site-header, .site-nav { position: static !important }" })
      await page.waitForTimeout(7000)
      const box = await shot.take(page)
      const { viewport, ...area } = box
      await page.screenshot({ path: join(outDir, shot.name + ".png"), clip: area, fullPage: !viewport })
      console.log(shot.name, problems.length ? "ERRORS " + problems.join(" | ") : "ok")
    } catch (e) {
      console.log(shot.name, "FAILED", e.message.split("\n")[0])
    }
    await page.close()
  }
} finally {
  await browser.close()
}
