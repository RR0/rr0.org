// Screenshots for the third Medium article on UFO@home (the architecture), taken on the live sites, in English.
//   node article-3-shots.mjs <outDir> [name ...]
// Runs a headed Chromium (WebGL), so outside a sandbox.
import { createRequire } from "node:module"
import { mkdirSync } from "node:fs"
import { join } from "node:path"

const require = createRequire(import.meta.url)
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "/Users/javarome/project/@javarome/thesteps2/node_modules/playwright")
const [outDir, ...wanted] = process.argv.slice(2)
mkdirSync(outDir, { recursive: true })
const UFO = process.env.SITE || "https://ufoathome.org"
const edit = file => `${UFO}/edit/index.html?file=/demo-data/${file}.json`
const play = (file, extra = "") => `${UFO}/play/index.html?file=${encodeURIComponent("/demo-data/" + file + ".json")}${extra}`

/** Runs in the page: every element matching `f`, through shadow roots. */
const DEEP = "const deep = (root, f, acc = []) => { root.querySelectorAll('*').forEach(e => { if (f(e)) acc.push(e); if (e.shadowRoot) deep(e.shadowRoot, f, acc) }); return acc };"

/** Opens the case's first observation, then one group of its editor (a tab toggles its group). */
async function openGroup(page, id) {
  await page.evaluate(async ({ id, DEEP }) => {
    eval(DEEP + "window.__deep = deep")
    const deep = window.__deep
    if (!window.__opened) {
      deep(document, e => e.matches("li.event-card[data-kind=observation]"))[0]?.querySelector(".event-open")?.click()
      window.__opened = true
      await new Promise(r => setTimeout(r, 3000))
    }
    const tab = deep(document, e => e.getAttribute("aria-controls") === id)[0]
    if (tab && tab.getAttribute("aria-expanded") !== "true") tab.click()
  }, { id, DEEP })
  await page.waitForTimeout(2000)
}

/** The union of the boxes of what `selectors` match (deeply), in page coordinates, grown by `pad`. */
async function clipOf(page, selectors, pad = 12, maxHeight) {
  const boxes = await page.evaluate(({ selectors, DEEP }) => {
    eval(DEEP + "window.__deep = deep")
    const out = []
    for (const s of selectors) {
      const e = window.__deep(document, e => e.matches(s) && e.getBoundingClientRect().width > 0)[0]
      if (!e) continue
      const b = e.getBoundingClientRect()
      out.push({ x: b.x + scrollX, y: b.y + scrollY, r: b.right + scrollX, b: b.bottom + scrollY })
    }
    return out
  }, { selectors, DEEP })
  if (!boxes.length) throw new Error("nothing matches " + selectors.join(", "))
  const x = Math.max(0, Math.min(...boxes.map(b => b.x)) - pad), y = Math.max(0, Math.min(...boxes.map(b => b.y)) - pad)
  const r = Math.max(...boxes.map(b => b.r)) + pad
  let b = Math.max(...boxes.map(b => b.b)) + pad
  if (maxHeight && b - y > maxHeight) b = y + maxHeight
  return { x, y, width: r - x, height: b - y }
}

async function startPlayer(page) {
  const canvas = page.locator("rr0-sighting canvas:visible").first()
  await canvas.scrollIntoViewIfNeeded()
  const box = await canvas.boundingBox()
  if (box) await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2)
  await page.waitForTimeout(6000)
  await page.mouse.move(2, 2)
  await page.waitForTimeout(1500)
}

const SHOTS = [
  {
    // A case file of rr0.org, an encyclopaedia page, with the reconstruction embedded in its text.
    name: "rr0org", url: "https://rr0.org/science/crypto/ufo/enquete/dossier/Cussac/", async take(page) {
      await startPlayer(page)
      const sighting = page.locator("rr0-sighting").first()
      await sighting.evaluate(e => e.scrollIntoView({ block: "end" }))
      await page.waitForTimeout(800)
      return { clip: await clipOf(page, ["rr0-sighting"], 0).then(c => ({ ...c, y: Math.max(0, c.y - 260), height: c.height + 260 })) }
    }
  },
  {
    name: "sources", url: edit("case-silly-le-long"), async take(page) {
      await openGroup(page, "group-location")
      await page.evaluate(({ DEEP }) => { eval(DEEP + "window.__deep = deep"); window.__deep(document, e => e.id === "location-settings-button")[0]?.click() }, { DEEP })
      await page.waitForTimeout(1500)
      await page.evaluate(({ DEEP }) => {
        eval(DEEP + "window.__deep = deep")
        const panel = window.__deep(document, e => e.id === "location-settings")[0]
        const select = panel?.querySelector("select")
        if (!select) return
        const i = [...select.options].findIndex(o => /photograph|imagery|relief/i.test(o.text))
        if (i >= 0) { select.selectedIndex = i; select.dispatchEvent(new Event("change", { bubbles: true })) }
      }, { DEEP })
      await page.waitForTimeout(1500)
      return { clip: await clipOf(page, ["#location-settings"], 16) }
    }
  },
  {
    name: "files", url: edit("case-silly-le-long"), async take(page) {
      await openGroup(page, "group-file")
      const options = await page.evaluate(({ DEEP }) => {
        eval(DEEP + "window.__deep = deep")
        const select = window.__deep(document, e => e.id === "file-item")[0]
        return select ? [...select.options].map(o => o.text) : []
      }, { DEEP })
      console.log("  file items:", options.join(" | "))
      await page.evaluate(({ DEEP }) => {
        eval(DEEP + "window.__deep = deep")
        const select = window.__deep(document, e => e.id === "file-item")[0]
        const i = [...select.options].findIndex(o => /imagery|aerial|photo/i.test(o.text))
        select.selectedIndex = i >= 0 ? i : 1
        select.dispatchEvent(new Event("change", { bubbles: true }))
      }, { DEEP })
      await page.waitForTimeout(1500)
      return { clip: await clipOf(page, ["#group-file"], 8, 1100) }
    }
  },
  {
    name: "models", url: edit("case-silly-le-long"), async take(page) {
      await openGroup(page, "group-decor")
      await page.evaluate(({ DEEP }) => {
        eval(DEEP + "window.__deep = deep")
        const trigger = window.__deep(document, e => e.matches("rr0-popover-picker .pp-trigger") && e.getBoundingClientRect().width > 0 && /model|airliner|car|aircraft/i.test(e.closest("label, div")?.textContent ?? ""))[0]
          ?? window.__deep(document, e => e.matches("rr0-popover-picker .pp-trigger") && e.getBoundingClientRect().width > 0)[0]
        trigger?.click()
      }, { DEEP })
      await page.waitForTimeout(2500)
      return { clip: await clipOf(page, [".pp-panel:popover-open"], 12, 1100) }
    }
  },
  {
    name: "share", url: play("case-silly-le-long", "&t=25"), async take(page) {
      await startPlayer(page)
      await page.evaluate(({ DEEP }) => {
        eval(DEEP + "window.__deep = deep")
        window.__deep(document, e => e.id === "share-button")[0]?.click()
      }, { DEEP })
      await page.waitForTimeout(1500)
      await page.evaluate(({ DEEP }) => {
        eval(DEEP + "window.__deep = deep")
        const freeze = window.__deep(document, e => e.id === "freeze")[0]
        if (freeze && !freeze.checked) freeze.click()
        // The code tab rather than the link, when there is one.
        const code = window.__deep(document, e => (e.tagName === "BUTTON" || e.getAttribute("role") === "tab") && /^(Embed|Code)/i.test(e.textContent.trim()) && e.getBoundingClientRect().width > 0)[0]
        code?.click()
      }, { DEEP })
      await page.waitForTimeout(1500)
      return { clip: await clipOf(page, ["dialog#dialog[open]"], 12, 1200) }
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
      const done = await shot.take(page)
      const path = join(outDir, shot.name + ".png")
      await page.screenshot({ path, clip: done.clip, fullPage: true })
      console.log(shot.name, problems.length ? "ERRORS " + problems.join(" | ") : "ok")
    } catch (e) {
      console.log(shot.name, "FAILED", e.message.split("\n")[0])
    }
    await page.close()
  }
} finally {
  await browser.close()
}
