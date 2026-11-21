// Screenshots for the Medium article on UFO@home's interviews, on the Saint-Lô case, in English.
//   SITE=http://localhost:3002 node article-4-shots.mjs <outDir> [name ...]
// Runs a headed Chromium (WebGL), so outside a sandbox.
import { createRequire } from "node:module"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { tmpdir } from "node:os"

const require = createRequire(import.meta.url)
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "/Users/javarome/project/@javarome/thesteps2/node_modules/playwright")
const [outDir, ...wanted] = process.argv.slice(2)
mkdirSync(outDir, { recursive: true })
const SITE = process.env.SITE || "https://ufoathome.org"
// In the app (/app/), whose editor has the whole width, as wide editors are laid out since 0.197.
// A recording is named by its whole address (a bare path is refused since 0.184): ufoathome.org's, even for a local build.
const DATA = process.env.DATA || "https://ufoathome.org"
const CASE = `${SITE}/app/?mode=edit&file=${encodeURIComponent(DATA + "/demo-data/case-saint-lo.json")}`

/** Defines window.__deep(root, test): every element passing `test`, through shadow roots. */
const DEEP = () => {
  window.__deep = (root, f, acc = []) => {
    root.querySelectorAll("*").forEach(e => { if (f(e)) acc.push(e); if (e.shadowRoot) window.__deep(e.shadowRoot, f, acc) })
    return acc
  }
}

/** Opens the event of the case of that kind, then (optionally) a group of its editor; a group tab toggles. */
async function open(page, kind, group, section) {
  await page.evaluate(DEEP)
  await page.evaluate(async ({ kind, group, section }) => {
    const card = window.__deep(document, e => e.matches(`.event-card[data-kind=${kind}]`))[0]
    card?.querySelector(".event-open")?.click()
    await new Promise(r => setTimeout(r, 3500))
    if (!group) return
    const tab = window.__deep(document, e => e.getAttribute("aria-controls") === group && e.getBoundingClientRect().width > 0)[0]
    if (tab && tab.getAttribute("aria-expanded") !== "true" && tab.getAttribute("aria-selected") !== "true") tab.click()
    await new Promise(r => setTimeout(r, 1500))
    // Every section is shown folded to its title (since 0.194): those of the group are unfolded, nested ones too, by their titles.
    const panel = window.__deep(document, e => e.id === group && e.getBoundingClientRect().width > 0)[0]
    for (let pass = 0; panel && pass < 3; pass++) {
      for (const title of window.__deep(panel, e => e.matches(".form-section[data-foldable]:not([data-unfolded]) > .section-title"))) title.click()
      await new Promise(r => setTimeout(r, 300))
    }
    // Wide, a group shows one of its sections at a time, picked in the index beside it.
    const link = section && window.__deep(document, e => e.matches(".section-link") && e.getBoundingClientRect().width > 0 && e.getAttribute("title") === section)[0]
    if (link && link.getAttribute("aria-current") !== "true") { link.click(); await new Promise(r => setTimeout(r, 1200)) }
  }, { kind, group, section })
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
  const box = await turnsBox(page)
  return { x: box.x + box.scrollX, y: box.y + box.scrollY, width: box.width, height: box.height }
}

/** The box of the turns wholly in view in the exchanges' frame, in the window's coordinates: none cut at the top or the bottom. */
const turnsBox = page => page.evaluate(() => {
  const frame = window.__deep(document, e => e.matches(".rr0-interview-turns[data-shot]"))[0]
  const f = frame.getBoundingClientRect()
  const whole = [...frame.querySelectorAll(".turn")].map(t => t.getBoundingClientRect()).filter(r => r.height > 0 && r.top >= f.top - 1 && r.bottom <= f.bottom + 1)
  const top = Math.min(...whole.map(r => r.top)), bottom = Math.max(...whole.map(r => r.bottom))
  return { x: Math.max(0, f.x - 4), y: top - 6, width: f.width + 8, height: bottom - top + 12, scrollX, scrollY }
})

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
      await framed(page, `t => /Il n'y en a pas/.test(t.textContent)`)
      // Its reason is a tooltip: the pointer over the bar shows it.
      const bar = await page.evaluate(() => {
        const b = window.__deep(document, e => e.matches(".turn .said .bar") && /Il n'y en a pas/.test(e.closest(".turn").textContent))[0]
        // Focused as well as pointed at: its reason shows on either, and focus does not depend on where the pointer lands.
        b.focus()
        const r = b.getBoundingClientRect()
        return { x: r.x + r.width / 2, y: r.y + r.height / 2 }
      })
      await page.mouse.move(bar.x, bar.y)
      await page.waitForTimeout(1200)
      // In the window's own coordinates, and without a full page capture, which resizes the window and loses the hover.
      const { scrollX, scrollY, ...frame } = await turnsBox(page)
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
      // From the banner down to the bottom of the picture under it: the sections below the picture say nothing of this.
      return page.evaluate(() => {
        const cited = window.__deep(document, e => e.id === "cited" && e.getBoundingClientRect().width > 0)[0]
        const c = cited.getBoundingClientRect()
        const canvas = window.__deep(document, e => e.tagName === "CANVAS" && e.getBoundingClientRect().width > 200 && e.getBoundingClientRect().top > c.bottom)
          .map(e => e.getBoundingClientRect()).sort((p, q) => p.top - q.top)[0]
        const right = Math.max(c.right, canvas.right), bottom = canvas.bottom
        return { x: c.x + scrollX - 12, y: c.y + scrollY - 12, width: right - c.x + 24, height: bottom - c.y + 24 }
      })
    }
  },
  {
    // The other way: under a moment of the observation, the passages of the interview that tell of it.
    name: "moment-passages", async take(page) {
      await open(page, "observation", "group-temporal", "Moments")
      return clip(page, `e => e.matches(".moment-passages")`, 12, { above: 70, below: 20 })
    }
  },
  {
    // A value of the observation whose source is the interview: its basis window, quoting the call.
    name: "value-from-interview", async take(page) {
      await open(page, "observation", "group-location", "Witness's events")
      const found = await page.evaluate(async () => {
        // The heading of the witness's first event (looking), whose basis quotes the call; its pill does not always hold its entry before its window opens, hence its label too.
        const cites = () => window.__deep(document, e => e.tagName === "RR0-INPUT-BASIS" && e.getBoundingClientRect().width > 0
          && (/2026-10-13/.test(e.entry?.rationale ?? "") || /^Heading/.test((e.closest(".event-param-label")?.textContent ?? "").trim())))[0]
        // Wide, the group shows one section at a time: each in turn until one holds the value.
        for (const link of window.__deep(document, e => e.matches(".section-link[data-section]") && e.getBoundingClientRect().width > 0)) {
          if (cites()) break
          link.click()
          await new Promise(r => setTimeout(r, 1200))
        }
        const pill = cites()
        if (!pill) return false
        // High in the window, so that its own window opens under it and leaves the field and its name in view.
        pill.scrollIntoView({ block: "start" })
        // Then down a little, so that the field's name above it is in view too: whichever box scrolls it, the page or a panel.
        let box = pill
        while (box) {
          const parent = box.parentElement ?? box.getRootNode()?.host
          if (parent && parent.scrollHeight > parent.clientHeight + 4 && /auto|scroll/.test(getComputedStyle(parent).overflowY)) { parent.scrollTop -= 160; break }
          box = parent
        }
        if (!box) window.scrollBy(0, -160)
        await new Promise(r => setTimeout(r, 400))
        pill.setAttribute("data-shot", "")
        // The note above the events ends right where the window opens, cut off by the frame: it says nothing this picture shows.
        for (const note of window.__deep(document, e => e.children.length === 0 && /poses are worked out from these events/.test(e.textContent))) note.style.visibility = "hidden"
        pill.querySelector("[role=button]")?.click()
        await new Promise(r => setTimeout(r, 1000))
        return true
      })
      if (!found) throw new Error("no value cites the call")
      const boxes = await page.evaluate(() => {
        // In the window's own coordinates: a full page capture resizes the window, and the window anchored to its field moves with it.
        const r = e => { const b = e.getBoundingClientRect(); return { x: b.x, y: b.y, r: b.right, b: b.bottom } }
        const pill = window.__deep(document, e => e.matches("rr0-input-basis[data-shot]"))[0]
        const open = window.__deep(document, e => { try { return e.matches(":popover-open") } catch { return false } })
        // The field the value is in, with its name, beside its pill: the row the pill heads.
        const row = pill.closest("label, .field, .parameter-row, .event-param") ?? pill
        const field = row.parentElement?.querySelector("input, select") ?? row
        return [r(row), r(field), r(pill), ...open.map(r)]
      })
      // From the top of the window (boxes[1]): the label's box above it reaches into the paragraph before the list.
      // From the field's name, above its pill, to the bottom of the window, which ends the picture.
      const x = Math.max(0, Math.min(...boxes.map(b => b.x)) - 12), y = Math.max(0, Math.min(...boxes.map(b => b.y)) - 40)
      return { x, y, width: Math.max(...boxes.map(b => b.r)) + 12 - x, height: Math.max(...boxes.map(b => b.b)) + 1 - y, viewport: true }
    }
  },
]

// The installed Chrome, not Playwright's old Chromium (124), which knows no anchor positioning; native fields in English too (see
// article-2-shots.mjs).
const launcher = join(tmpdir(), "chrome-en.sh")
writeFileSync(launcher, `#!/bin/sh\nexec "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" -AppleLanguages "(en-US)" -AppleLocale en_US "$@"\n`, { mode: 0o755 })
const browser = await chromium.launch({ headless: false, executablePath: launcher, args: ["--lang=en-US"] })
const context = await browser.newContext({ locale: "en-US", viewport: { width: 1600, height: 1500 }, deviceScaleFactor: 1.5 })
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
