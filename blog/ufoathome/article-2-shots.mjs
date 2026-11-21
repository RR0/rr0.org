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
// A recording is named by its whole address (a bare path is refused since 0.184): ufoathome.org's, even for a local build.
const DATA = process.env.DATA || "https://ufoathome.org"
const editPage = file => `/edit/index.html?file=${encodeURIComponent(DATA + "/demo-data/" + file + ".json")}`
// The app (/app/), whose editor has the whole width: from 820 px an observation shows the index of its sections beside them.
const edit = file => `/app/?mode=edit&file=${encodeURIComponent(DATA + "/demo-data/" + file + ".json")}`
const play = (file, extra = "") => `/play/index.html?file=${encodeURIComponent(DATA + "/demo-data/" + file + ".json")}${extra}`

/** Opens a group of the observation editor by the panel it controls, and frames that panel. */
// The case editor lists its events; an observation's editor, and its group tabs, only show once one is opened. A tab toggles its group.
const clickTab = (page, id) => page.evaluate(async (id) => {
  const deep = (root, f, acc = []) => { root.querySelectorAll("*").forEach(e => { if (f(e)) acc.push(e); if (e.shadowRoot) deep(e.shadowRoot, f, acc) }); return acc }
  if (!window.__opened) {
    const card = deep(document, e => e.matches(".event-card[data-kind=observation]"))[0]
    card?.querySelector(".event-open")?.click()
    window.__opened = true
    await new Promise(r => setTimeout(r, 3000))
  }
  const tab = deep(document, e => e.getAttribute("aria-controls") === id)[0]
  if (tab && tab.getAttribute("aria-expanded") !== "true") tab.click()
  await new Promise(r => setTimeout(r, 800))
  // Every section is shown folded to its title (since 0.194): those of the group are unfolded, nested ones too, by their titles.
  const panel = deep(document, e => e.id === id && e.getBoundingClientRect().width > 0)[0]
  for (let pass = 0; panel && pass < 3; pass++) {
    for (const title of deep(panel, e => e.matches(".form-section[data-foldable]:not([data-unfolded]) > .section-title"))) title.click()
    await new Promise(r => setTimeout(r, 300))
  }
}, id)
/** In a wide editor (since 0.197), picks the part or section of the open group its index names, as a click on it does. */
const pick = (page, title) => page.evaluate(async (title) => {
  const deep = (root, f, acc = []) => { root.querySelectorAll("*").forEach(e => { if (f(e)) acc.push(e); if (e.shadowRoot) deep(e.shadowRoot, f, acc) }); return acc }
  const link = deep(document, e => e.matches(".section-link") && e.getBoundingClientRect().width > 0 && e.getAttribute("title") === title)[0]
  if (link && link.getAttribute("aria-current") !== "true") link.click()
  await new Promise(r => setTimeout(r, 1200))
}, title)
/** The box of the open group, under the render (the index of its sections stands beside the render, out of the frame), in page coordinates. */
const groupBox = (page, id) => page.evaluate((id) => {
  const deep = (root, f, acc = []) => { root.querySelectorAll("*").forEach(e => { if (f(e)) acc.push(e); if (e.shadowRoot) deep(e.shadowRoot, f, acc) }); return acc }
  const panel = deep(document, e => e.id === id && e.getBoundingClientRect().width > 0)[0]
  const p = panel.getBoundingClientRect()
  // The panel is as tall as the column it stands in: down to what it shows, no further; from just under the picture above it.
  const b = Math.max(...deep(panel, e => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 }).map(e => e.getBoundingClientRect().bottom))
  return { x: p.x + scrollX, y: p.y + scrollY + 8, width: p.width, height: b - p.y + 8 }
}, id)
const group = (id, part) => async page => {
  await clickTab(page, id)
  if (part) await pick(page, part)
  await page.waitForTimeout(1500)
  await page.locator(`#${id}:visible`).first().scrollIntoViewIfNeeded()
  await page.waitForTimeout(500)
  return { clip: await groupBox(page, id) }
}

const SHOTS = [
  {
    name: "case-editor", url: editPage("case-socorro"), async take(page) {
      return { locator: page.locator("rr0-case-editor").first() }
    }
  },
  { name: "witness", url: edit("case-silly-le-long"), take: group("group-observer") },
  { name: "timeline", url: edit("case-socorro"), take: group("group-temporal", "Period") },
  {
    // Down to the legs' turning rate, whose "assumed" mark the caption points at: the group is taller than the window, so the page is.
    name: "phenomenon", url: edit("case-valensole"), async take(page) {
      await page.setViewportSize({ width: 1600, height: 2600 })
      await clickTab(page, "group-shape")
      await pick(page, "Bodies")
      await page.waitForTimeout(2000)
      const panel = page.locator("#group-shape:visible").first()
      await panel.scrollIntoViewIfNeeded()
      await page.waitForTimeout(500)
      const box = await groupBox(page, "group-shape")
      const top = { x: box.x, y: box.y - await page.evaluate(() => scrollY), width: box.width }
      const rate = page.getByText("Turns a second", { exact: false }).first()
      const row = await rate.evaluate(e => { const r = (e.closest("label, .field, div") ?? e).getBoundingClientRect(); return { y: r.y, b: r.bottom } })
      return { clip: { x: top.x, y: top.y, width: top.width, height: row.b - top.y + 16 }, inView: true }
    }
  },
  { name: "phenomenon-2d", url: edit("case-socorro"), take: group("group-shape", "Shapes") },
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
        // Wide, a group shows one of its sections at a time: each in turn.
        const titles = await page.evaluate(() => {
          const deep = (root, f, acc = []) => { root.querySelectorAll("*").forEach(e => { if (f(e)) acc.push(e); if (e.shadowRoot) deep(e.shadowRoot, f, acc) }); return acc }
          return deep(document, e => e.matches(".section-link[data-section]") && e.getBoundingClientRect().width > 0).map(e => e.getAttribute("title"))
        })
        let found = false
        for (const title of titles.length ? titles : [undefined]) {
        if (title) await pick(page, title)
        found = await page.evaluate((panelId) => {
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
        if (found) break
      }
      const pill = page.locator("rr0-input-basis[data-shot]").first()
      // Centred at the last moment, what a group draws late having moved it: the window then opens under its field, with the field in view.
      await pill.evaluate(p => p.scrollIntoView({ block: "center" }))
      await page.waitForTimeout(800)
      await pill.locator("[role=button]").first().click()
      await page.waitForTimeout(1000)
      // A select's open list is drawn by the system, out of the page's reach: the capture shows its values as a list that stays open.
      await page.evaluate(() => {
        const deep = (root, f, acc = []) => { root.querySelectorAll("*").forEach(e => { if (f(e)) acc.push(e); if (e.shadowRoot) deep(e.shadowRoot, f, acc) }); return acc }
        const select = deep(document, e => e.matches(".basis-window:popover-open select"))[0]
        select.size = select.options.length
        select.style.cssText = "height: auto; background-image: none; padding: 4px; overflow: hidden"
      })
      await page.waitForTimeout(500)
      const boxes = await page.evaluate(() => {
        const deep = (root, f, acc = []) => { root.querySelectorAll("*").forEach(e => { if (f(e)) acc.push(e); if (e.shadowRoot) deep(e.shadowRoot, f, acc) }); return acc }
        const r = e => { const b = e.getBoundingClientRect(); return { x: b.x, y: b.y, r: b.right, b: b.bottom } }
        const pill = document.querySelector("rr0-input-basis[data-shot]") || deep(document, e => e.matches("rr0-input-basis[data-shot]"))[0]
        const open = deep(document, e => { try { return e.matches(":popover-open") } catch { return false } })
        return [r(pill.parentElement), ...open.map(r)]
      })
      // The field's row above the window, with the two rows before it for context.
      const x = Math.min(...boxes.map(b => b.x)) - 12, y = Math.min(...boxes.map(b => b.y)) - 122
      const r = Math.max(...boxes.map(b => b.r)) + 24, b = Math.max(...boxes.map(b => b.b)) + 8
      // In the window as it stands: a full page capture resizes it, and the window opened then leaves its anchor.
      return { clip: { x, y, width: r - x, height: b - y }, inView: true }
    }
  },
  {
    name: "compare", url: play("case-mcminnville", "&t=2"), player: true, async take(page) {
      // A case is read in <rr0-case>: the 2013 study is one of its readings, opened from its history in a player of its own.
      await page.locator("rr0-case .event-card[data-kind=reading]").filter({ hasText: "70 cm" }).first().locator("button.event-open").click()
      await page.waitForTimeout(5000)
      const player = page.locator("rr0-sighting").last()
      await player.scrollIntoViewIfNeeded()
      await player.locator("#compare-account").click()
      await page.waitForTimeout(4000)
      // No focus ring left on the button the click went through.
      await page.evaluate(() => { let e = document.activeElement; while (e?.shadowRoot?.activeElement) e = e.shadowRoot.activeElement; e?.blur?.() })
      await page.mouse.move(2, 2)
      await page.waitForTimeout(1500)
      return { locator: player }
    }
  },
]

// The installed Chrome, not Playwright's old Chromium (124), which knows no anchor positioning: a window anchored to its field would be centred.
// In English for good, native fields too (a number's decimal comma, a date's "jj/mm/aaaa"): on macOS these follow the system's language,
// which only arguments Playwright refuses can override, hence a launcher.
const launcher = join(tmpdir(), "chromium-en.sh")
writeFileSync(launcher, `#!/bin/sh\nexec "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" -AppleLanguages "(en-US)" -AppleLocale en_US "$@"\n`, { mode: 0o755 })
const browser = await chromium.launch({ headless: false, executablePath: launcher, args: ["--lang=en-US"] })
const context = await browser.newContext({ locale: "en-US", viewport: { width: 1600, height: 1700 }, deviceScaleFactor: 1.5 })
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
