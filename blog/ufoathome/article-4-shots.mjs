// Screenshots for the Medium article on UFO@home's interviews, on the Saint-Lô case, in English.
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
const CASE = `${SITE}/edit/index.html?file=/demo-data/case-saint-lo.json`

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
    name: "interview-summary", async take(page) {
      await open(page, "interview", "group-summary")
      return clip(page, `e => e.id === "group-summary"`)
    }
  },
  {
    // The turn that tells of a moment of the observation, with its link, and the turns around it.
    name: "interview-linked-turn", async take(page) {
      await open(page, "interview", "group-exchanges")
      return framed(page, `t => t.querySelector(".ref")`)
    }
  },
  {
    // A turn of which only a stretch was taken out (the streets that would give the place away), the answer kept.
    name: "interview-redacted", async take(page) {
      await open(page, "interview", "group-exchanges")
      const box = await framed(page, `t => /Il n'y en a pas/.test(t.textContent)`)
      // Its reason is a tooltip: the pointer over the bar shows it.
      const bar = await page.evaluate(() => {
        const b = window.__deep(document, e => e.matches(".turn .said .bar") && /Il n'y en a pas/.test(e.closest(".turn").textContent))[0]
        const r = b.getBoundingClientRect()
        return { x: r.x + r.width / 2, y: r.y + r.height / 2 }
      })
      await page.mouse.move(bar.x, bar.y)
      await page.waitForTimeout(1200)
      // In the window's own coordinates, and without a full page capture, which resizes the window and loses the hover.
      const frame = await page.evaluate(() => {
        const r = window.__deep(document, e => e.matches(".rr0-interview-turns[data-shot]"))[0].getBoundingClientRect()
        return { x: Math.max(0, r.x - 4), y: Math.max(0, r.y - 4), width: r.width + 8, height: r.height + 8 }
      })
      return { ...frame, viewport: true }
    }
  },
  {
    // Whole turns taken out, each a bar that says why.
    name: "interview-redacted-whole", async take(page) {
      await open(page, "interview", "group-exchanges")
      return framed(page, `t => !t.querySelector(".said") && t.querySelector(".redacted, .bar")`)
    }
  },
  {
    // Following the link: the observation, at that moment, with the way back to the interview.
    name: "interview-to-moment", async take(page) {
      await open(page, "interview", "group-exchanges")
      await page.evaluate(async () => {
        const ref = window.__deep(document, e => e.matches(".turn .ref") && e.getBoundingClientRect().width > 0)[0]
        ref?.scrollIntoView({ block: "center" }); ref?.click()
        await new Promise(r => setTimeout(r, 6000))
      })
      await page.mouse.move(2, 2)
      await page.waitForTimeout(1500)
      return clip(page, `e => e.id === "cited"`, 12, { below: 586 })
    }
  },
  {
    // The other way: under a moment of the observation, the passages of the interview that tell of it.
    name: "moment-passages", async take(page) {
      await open(page, "observation", "group-temporal")
      return clip(page, `e => e.matches(".moment-passages")`, 12, { above: 150, below: 20 })
    }
  },
  {
    // A value of the observation whose source is the interview: its basis window, quoting the call.
    name: "value-from-interview", async take(page) {
      await open(page, "observation", "group-location")
      const found = await page.evaluate(async () => {
        const pill = window.__deep(document, e => e.tagName === "RR0-INPUT-BASIS" && /2026-10-13/.test(e.entry?.rationale ?? "") && e.getBoundingClientRect().width > 0)[0]
        if (!pill) return false
        pill.scrollIntoView({ block: "center" })
        pill.setAttribute("data-shot", "")
        // The note above the events ends right where the window opens, cut off by the frame: it says nothing this picture shows.
        for (const note of window.__deep(document, e => e.children.length === 0 && /poses are worked out from these events/.test(e.textContent))) note.style.visibility = "hidden"
        pill.querySelector("[role=button]")?.click()
        await new Promise(r => setTimeout(r, 1000))
        return true
      })
      if (!found) throw new Error("no value cites the call")
      const boxes = await page.evaluate(() => {
        const r = e => { const b = e.getBoundingClientRect(); return { x: b.x + scrollX, y: b.y + scrollY, r: b.right + scrollX, b: b.bottom + scrollY } }
        const pill = window.__deep(document, e => e.matches("rr0-input-basis[data-shot]"))[0]
        const open = window.__deep(document, e => { try { return e.matches(":popover-open") } catch { return false } })
        return [r(pill.closest("label, .field, .parameter-row") ?? pill), ...open.map(r)]
      })
      // From the top of the window (boxes[1]): the label's box above it reaches into the paragraph before the list.
      const x = Math.min(...boxes.map(b => b.x)) - 12, y = (boxes[1] ?? boxes[0]).y - 6
      return { x, y, width: Math.max(...boxes.map(b => b.r)) + 12 - x, height: Math.max(...boxes.map(b => b.b)) + 12 - y }
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
      await page.goto(CASE, { waitUntil: "load" })
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
