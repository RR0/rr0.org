// Screenshots for the Medium article on UFO@home, taken on the live ufoathome.org player, in English.
//   node article-shots.mjs <outDir> [name ...]
import { createRequire } from "node:module"
import { mkdirSync } from "node:fs"
import { join } from "node:path"

const require = createRequire(import.meta.url)
const { chromium } = require("/Users/javarome/project/@javarome/thesteps2/node_modules/playwright")
const [outDir, ...wanted] = process.argv.slice(2)
mkdirSync(outDir, { recursive: true })
const SITE = process.env.SITE || "https://ufoathome.org"

const play = (file, extra = "") => `/play/index.html?file=${encodeURIComponent("/demo-data/" + file + ".json")}${extra}`

/** name, url, what to do before the shot, how long to let it play, what to frame. */
const SHOTS = [
  { name: "silly-account", url: play("case-silly-le-long", "&t=25"), wait: 6000, pause: true, frame: "canvas" },
  { name: "silly-geipan", url: play("case-silly-le-long", "&t=25"), interpretation: 1, wait: 6000, pause: true, frame: "canvas" },
  { name: "silly-geipan-ui", url: play("case-silly-le-long"), interpretation: 1, wait: 9000, frame: "sighting" },
  { name: "mcminnville-study", url: play("case-mcminnville", "&labels=0"), interpretation: 1, wait: 9000, frame: "canvas" },
  { name: "reentry", url: play("sky-test-reentry", "&labels=0"), wait: 12000, frame: "canvas" },
  { name: "instamatic", url: play("instrument-instamatic", "&labels=0"), wait: 9000, frame: "canvas" },
  { name: "naked-eye", url: play("instrument-eye", "&labels=0"), wait: 9000, frame: "canvas" },
  { name: "chips", url: play("case-silly-le-long"), wait: 9000, frame: "sighting" },
  { name: "valensole", url: play("case-valensole", "&labels=0"), wait: 9000, frame: "canvas" },
  { name: "cussac-photo", url: play("observer-cussac", "&labels=0&t=30"), wait: 10000, frame: "canvas" },
  { name: "socorro-1", url: play("case-socorro", "&t=8"), interpretation: 1, wait: 6000, pause: true, frame: "canvas" },
  { name: "socorro-2", url: play("case-socorro", "&t=8"), interpretation: 2, wait: 6000, pause: true, frame: "canvas" },
  { name: "editor", url: "/edit/index.html?file=/demo-data/case-socorro.json", wait: 9000, frame: "page" },
]

const browser = await chromium.launch({ headless: false, args: ["--lang=en-US"] })
const context = await browser.newContext({ locale: "en-US", viewport: { width: 1200, height: 1000 }, deviceScaleFactor: 1.5 })
try {
  for (const shot of SHOTS) {
    if (wanted.length && !wanted.includes(shot.name)) continue
    const page = await context.newPage()
    const problems = []
    page.on("pageerror", e => problems.push(e.message))
    try {
      await page.goto(SITE + shot.url, { waitUntil: "load" })
      await page.addStyleTag({ content: "header, .site-header, .site-nav { position: static !important }" })
      await page.waitForTimeout(4000)
      const canvas = page.locator("rr0-sighting canvas:visible").first()
      if (shot.frame !== "page") {
        await canvas.scrollIntoViewIfNeeded()
        const box = await canvas.boundingBox()
        if (box) await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2)
      }
      if (shot.interpretation !== undefined) {
        await page.locator("rr0-sighting #interpretation").selectOption({ index: shot.interpretation })
      }
      if (shot.observer !== undefined) {
        await page.locator("rr0-sighting #observer").selectOption({ index: shot.observer })
      }
      await page.waitForTimeout(shot.wait)
      if (shot.pause && shot.frame !== "page") {
        const box = await canvas.boundingBox()
        if (box) await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2)
        await page.waitForTimeout(1200)
      }
      await page.mouse.move(2, 2)
      await page.waitForTimeout(1500)
      const path = join(outDir, shot.name + ".png")
      if (shot.frame === "canvas") await canvas.screenshot({ path })
      else if (shot.frame === "sighting") await page.locator("rr0-sighting").first().screenshot({ path })
      else await page.screenshot({ path })
      console.log(shot.name, problems.length ? "ERRORS " + problems.join(" | ") : "ok")
    } catch (e) {
      console.log(shot.name, "FAILED", e.message.split("\n")[0])
    }
    await page.close()
  }
} finally {
  await browser.close()
}
