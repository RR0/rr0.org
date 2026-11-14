// Re-imports the UFO@home series from Medium over the Markdown copies beside this script: the version online is the reference, since
// it is edited there. Each image keeps its local file (matched to the online one by its caption) and its descriptive alt text.
//   curl -sL https://medium.com/feed/@rr0 -o feed.xml   (Medium's pages answer curl with Cloudflare; the feed does not)
//   node medium-sync.mjs feed.xml
// The feed holds the last ten articles only.
import fs from "node:fs"
import path from "node:path"
import { createRequire } from "node:module"
import { fileURLToPath } from "node:url"

const require = createRequire("/Users/javarome/project/@rr0/rr0.org/package.json")
const { JSDOM } = require("jsdom")
const dir = path.dirname(fileURLToPath(import.meta.url))
const [feedFile] = process.argv.slice(2)
const xml = new JSDOM(fs.readFileSync(feedFile, "utf-8"), { contentType: "text/xml" }).window.document
const series = {
  "replaying-the-sky-of-a-ufo-sighting": "01-replaying-the-sky.md",
  "what-a-ufo-reconstruction-states-and-on-what": "02-what-a-reconstruction-states.md",
  "built-to-outlast-its-sources": "03-built-to-outlast-its-sources.md",
  "what-the-witness-said-and-where-it-shows": "04-what-the-witness-said.md",
  "ai-writes-the-account-never-the-sky": "05-ai-writes-the-account.md"
}
const words = s => new Set(s.toLowerCase().replace(/\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/[^a-z0-9à-ÿ]+/g, " ").split(" ").filter(w => w.length > 2))

function inline(node, plain = false) {
  let out = ""
  for (const c of node.childNodes) {
    if (c.nodeType === 3) { out += c.textContent.replace(/</g, "\\<"); continue }
    if (c.nodeType !== 1) continue
    const t = c.tagName.toLowerCase(), inner = inline(c, plain)
    if (!plain && (t === "strong" || t === "b")) out += inner.trim() ? "**" + inner + "**" : inner
    else if (!plain && (t === "em" || t === "i")) out += inner.trim() ? "*" + inner + "*" : inner
    else if (t === "a") out += "[" + inner + "](" + c.getAttribute("href") + ")"
    else if (t === "code") out += "`" + c.textContent + "`"
    else if (t === "br") out += "\n"
    else out += inner
  }
  return out
}

function blocks(node, out) {
  for (const c of node.children) {
    const t = c.tagName.toLowerCase()
    if (t === "p") out.push(inline(c))
    else if (t === "h3" || t === "h1" || t === "h2") out.push("## " + inline(c))
    else if (t === "h4") out.push("### " + inline(c))
    else if (t === "blockquote") out.push("> " + inline(c))
    else if (t === "pre") {
      c.querySelectorAll("br").forEach(b => b.replaceWith("\n"))
      out.push("```html\n" + c.textContent + "\n```")
    }
    else if (t === "ul" || t === "ol") out.push([...c.children].map((li, i) => (t === "ul" ? "- " : (i + 1) + ". ") + inline(li)).join("\n"))
    else if (t === "figure") {
      const img = c.querySelector("img"), cap = c.querySelector("figcaption")
      if (img) out.push({ fig: cap ? inline(cap, true) : "", online: img.getAttribute("src") })
      else out.push("[Embedded content](" + c.querySelector("iframe")?.getAttribute("src") + ")")
    }
    else if (t === "hr") out.push("---")
    else if (t === "div" || t === "section") blocks(c, out)
    else out.push(inline(c))
  }
}

for (const item of xml.querySelectorAll("item")) {
  const link = item.querySelector("link").textContent.replace(/\?.*$/, "")
  const slug = link.replace("https://rr0.medium.com/", "").replace(/-[0-9a-f]{12}$/, "")
  const file = series[slug]
  if (!file) continue
  const n = Object.keys(series).indexOf(slug) + 1
  const local = fs.readFileSync(path.join(dir, file), "utf-8")
  const localFigs = [...local.matchAll(/^!\[(.*)\]\(([^)]+)\)\n\*(.*)\*$/gm)].map(m => ({ alt: m[1], src: m[2], words: words(m[3]) }))
  const title = item.querySelector("title").textContent
  const date = new Date(item.querySelector("pubDate").textContent).toISOString().slice(0, 10)
  const tags = [...item.querySelectorAll("category")].map(c => c.textContent)
  const body = new JSDOM("<body>" + item.getElementsByTagName("content:encoded")[0].textContent + "</body>").window.document.body
  const out = []
  blocks(body, out)
  if (out[0] === "## " + title) out.shift()
  let subtitle = ""
  if (typeof out[0] === "string" && out[0].startsWith("### ")) subtitle = out.shift().slice(4).replace(/^\*(.*)\*$/, "$1")
  const unused = new Set(localFigs)
  const md = out.map(b => {
    if (typeof b === "string") return b
    const w = words(b.fig)
    let best, score = -1
    for (const f of unused) {
      const s = [...w].filter(x => f.words.has(x)).length / new Set([...w, ...f.words]).size
      if (s > score) { score = s; best = f }
    }
    if (!best || score < 0.3) {
      // An image added online: kept at Medium's address until a local file is made for it.
      console.log(`${file}: new image online, kept at its Medium address: ${b.fig}`)
      return "![" + b.fig + "](" + b.online + ")\n*" + b.fig + "*"
    }
    unused.delete(best)
    return "![" + best.alt + "](" + best.src + ")\n*" + b.fig + "*"
  })
  const fm = ["---", "title: " + JSON.stringify(title), "subtitle: " + JSON.stringify(subtitle), "date: " + date, "lang: en",
    "url: " + link, "tags: [" + tags.join(", ") + "]", `series: "UFO@home (${n}/5)"`, "---"].join("\n")
  fs.writeFileSync(path.join(dir, file), fm + "\n\n# " + title + "\n\n*" + subtitle + "*\n\n" + md.join("\n\n").trim() + "\n")
  console.log(file, out.filter(b => typeof b !== "string").length, "images;", [...unused].map(f => "no longer online: " + f.src).join(", "))
}
