// Screenshots for the second Medium article on UFO@home (the model), taken on the live ufoathome.org, in English.
//   node article-2-shots.mjs <outDir> [name ...]
// Runs a headed Chromium (WebGL), so outside a sandbox.
import { createRequire } from "node:module"
import { mkdirSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"

const require = createRequire(import.meta.url)
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "/Users/javarome/project/@javarome/thesteps2/node_modules/playwright")
const [outDir, ...wanted] = process.argv.slice(2)
mkdirSync(outDir, { recursive: true })
const SITE = process.env.SITE || "https://ufoathome.org"
const edit = file => `/edit/index.html?file=/demo-data/${file}.json`
const play = (file, extra = "") => `/play/index.html?file=${encodeURIComponent("/demo-data/" + file + ".json")}${extra}`

/** Opens a group of the observation editor by the panel it controls, and frames that panel. */
// The case editor lists its events; an observation's editor, and its group tabs, only show once one is opened. A tab toggles its group.
const clickTab = (page, id) => page.evaluate(async (id) => {
  const deep = (root, f, acc = []) => { root.querySelectorAll("*").forEach(e => { if (f(e)) acc.push(e); if (e.shadowRoot) deep(e.shadowRoot, f, acc) }); return acc }
  if (!window.__opened) {
    const card = deep(document, e => e.matches("li.event-card[data-kind=observation]"))[0]
    card?.querySelector(".event-open")?.click()
    window.__opened = true
    await new Promise(r => setTimeout(r, 3000))
  }
  const tab = deep(document, e => e.getAttribute("aria-controls") === id)[0]
  if (tab && tab.getAttribute("aria-expanded") !== "true") tab.click()
}, id)
const group = (id) => async page => {
  await clickTab(page, id)
  await page.waitForTimeout(1500)
  const panel = page.locator(`#${id}:visible`).first()
  await panel.scrollIntoViewIfNeeded()
  await page.waitForTimeout(500)
  return { locator: panel }
}

const SHOTS = [
  {
    name: "case-editor", url: edit("case-socorro"), async take(page) {
      return { locator: page.locator("rr0-case-editor").first() }
    }
  },
  { name: "witness", url: edit("case-silly-le-long"), take: group("group-observer") },
  { name: "timeline", url: edit("case-socorro"), take: group("group-temporal") },
  { name: "phenomenon", url: edit("case-valensole"), take: group("group-shape") },
  { name: "phenomenon-2d", url: edit("case-socorro"), take: group("group-shape") },
  ...["silly-le-long", "socorro", "chiles-whitted"].map(c => ({
    name: `candidates-${c}`, url: edit(`case-${c}`), async take(page) {
      await clickTab(page, "group-observation")
      await page.waitForTimeout(6000)
      const section = page.locator(".candidates-section:visible").first()
      await section.scrollIntoViewIfNeeded()
      await page.waitForTimeout(1000)
      // The section's box spills over what follows it: framed from its top down to the note under the list.
      const box = await page.evaluate(() => {
        const deep = (root, f, acc = []) => { root.querySelectorAll("*").forEach(e => { if (f(e)) acc.push(e); if (e.shadowRoot) deep(e.shadowRoot, f, acc) }); return acc }
        const s = deep(document, e => e.matches(".candidates-section") && e.getBoundingClientRect().width > 0)[0]
        const top = s.getBoundingClientRect()
        const note = deep(s, e => e.children.length === 0 && /A cost is not a probability/.test(e.textContent))[0]
        const bottom = note ? note.getBoundingClientRect().bottom : top.top + 870
        return { x: top.x + scrollX, y: top.y + scrollY, width: top.width, height: bottom - top.top + 12 }
      })
      return { clip: box }
    }
  })),
  { name: "decor", url: edit("case-silly-le-long"), take: group("group-decor") },
  {
    name: "basis", url: edit("case-silly-le-long"), async take(page) {
      // Every tab in turn until one shows a value that is not the observer's own, then open its window.
      const tabs = ["group-observer", "group-location", "group-temporal", "group-shape", "group-decor"]
      for (const id of tabs) {
        await clickTab(page, id)
        await page.waitForTimeout(1200)
        const found = await page.evaluate((panelId) => {
          const deep = (root, acc = []) => { root.querySelectorAll("*").forEach(e => { if (e.tagName === "RR0-INPUT-BASIS") acc.push(e); if (e.shadowRoot) deep(e.shadowRoot, acc) }); return acc }
          const panel = document.querySelector(`#${panelId}`) || [...document.querySelectorAll("*")].map(e => e.shadowRoot?.getElementById(panelId)).find(Boolean)
          const pill = deep(panel || document).find(p => p.entry && p.entry.basis !== "stated" && p.getBoundingClientRect().width > 0)
          if (!pill) return null
          pill.scrollIntoView({ block: "center" })
          pill.setAttribute("data-shot", "1")
          return true
        }, id)
        if (found) break
      }
      const pill = page.locator("rr0-input-basis[data-shot]").first()
      await pill.locator("[role=button]").first().click()
      await page.waitForTimeout(1000)
      const boxes = await page.evaluate(() => {
        const deep = (root, f, acc = []) => { root.querySelectorAll("*").forEach(e => { if (f(e)) acc.push(e); if (e.shadowRoot) deep(e.shadowRoot, f, acc) }); return acc }
        const r = e => { const b = e.getBoundingClientRect(); return { x: b.x, y: b.y, r: b.right, b: b.bottom } }
        const pill = document.querySelector("rr0-input-basis[data-shot]") || deep(document, e => e.matches("rr0-input-basis[data-shot]"))[0]
        const open = deep(document, e => { try { return e.matches(":popover-open") } catch { return false } })
        return [r(pill.parentElement), ...open.map(r)]
      })
      const x = Math.min(...boxes.map(b => b.x)) - 12, y = Math.min(...boxes.map(b => b.y)) - 12
      const r = Math.max(...boxes.map(b => b.r)) + 12, b = Math.max(...boxes.map(b => b.b)) + 12
      // In the window as it stands: a full page capture resizes it, and the window opened then leaves its anchor.
      return { clip: { x, y, width: r - x, height: b - y }, inView: true }
    }
  },
  {
    name: "compare", url: play("case-mcminnville", "&t=2"), player: true, async take(page) {
      await page.locator("rr0-sighting #interpretation").selectOption({ index: 2 })
      await page.waitForTimeout(3000)
      await page.locator("rr0-sighting #compare-account").click()
      await page.waitForTimeout(4000)
      await page.mouse.move(2, 2)
      await page.waitForTimeout(1500)
      return { locator: page.locator("rr0-sighting").first() }
    }
  },
]

// In English for good, native fields too (a number's decimal comma, a date's "jj/mm/aaaa"): on macOS these follow the system's language,
// which only arguments Playwright refuses can override, hence a launcher.
const launcher = join(tmpdir(), "chromium-en.sh")
writeFileSync(launcher, `#!/bin/sh\nexec "${chromium.executablePath()}" -AppleLanguages "(en-US)" -AppleLocale en_US "$@"\n`, { mode: 0o755 })
const browser = await chromium.launch({ headless: false, executablePath: launcher, args: ["--lang=en-US"] })
const context = await browser.newContext({ locale: "en-US", viewport: { width: 1200, height: 1700 }, deviceScaleFactor: 1.5 })
try {
  for (const shot of SHOTS) {
    if (wanted.length && !wanted.includes(shot.name)) continue
    const page = await context.newPage()
    const problems = []
    page.on("pageerror", e => problems.push(e.message))
    try {
      await page.goto(SITE + shot.url, { waitUntil: "load" })
      await page.addStyleTag({ content: "header, .site-header, .site-nav { position: static !important }" })
      await page.waitForTimeout(7000)
      if (shot.player) {
        const canvas = page.locator("rr0-sighting canvas:visible").first()
        await canvas.scrollIntoViewIfNeeded()
        const box = await canvas.boundingBox()
        if (box) await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2)
        await page.waitForTimeout(2000)
      }
      const done = await shot.take(page)
      const path = join(outDir, shot.name + ".png")
      if (done.locator) await done.locator.screenshot({ path })
      else await page.screenshot({ path, clip: done.clip, fullPage: !done.inView })
      console.log(shot.name, problems.length ? "ERRORS " + problems.join(" | ") : "ok")
    } catch (e) {
      console.log(shot.name, "FAILED", e.message.split("\n")[0])
    }
    await page.close()
  }
} finally {
  await browser.close()
}
