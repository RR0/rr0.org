import { execFileSync } from "node:child_process"
import { existsSync, readFileSync, unlinkSync, writeFileSync } from "node:fs"
import path from "node:path"

export interface UpdatesSectionOptions {
  /**
   * The fragment written for the home page to include.
   */
  fragmentFile: string
  /**
   * Patterns of the site's content pages: anything else (header fragments, drafts outside the site…) is not listed.
   */
  contentRoots: string[]
  excluded: string[]
  outDir: string
  /**
   * The pages whose output must be regenerated when the fragment changes (the home page).
   */
  includers: string[]
  /**
   * How many days of updates are shown.
   */
  days?: number
  /**
   * How many pages a day shows at most.
   */
  maxPerDay?: number
}

/**
 * Writes the "Mises à jour" section of the home page: for each of the last days the site's pages changed, the
 * pages changed that day, linked.
 *
 * The days come from git (the date of each commit touching a page), plus today for the pages changed but not
 * committed yet, which a build is about to publish.
 */
export class UpdatesSection {

  constructor(protected options: UpdatesSectionOptions) {
  }

  write(): void {
    this.save(this.render(this.lastDays()))
  }

  protected git(...args: string[]): string {
    return execFileSync("git", args, {encoding: "utf-8", maxBuffer: 64 * 1024 * 1024})
  }

  protected today(): string {
    return new Date().toLocaleDateString("sv-SE")  // YYYY-MM-DD, local
  }

  /**
   * The pages changed on each of the last days, most recent day and page first.
   */
  protected lastDays(): Map<string, string[]> {
    const days = this.options.days ?? 3
    const byDay = new Map<string, string[]>()
    const add = (day: string, file: string) => {
      if (!existsSync(file) || !this.isContent(file)) {
        return
      }
      const files = byDay.get(day) ?? []
      if (!files.includes(file)) {
        files.push(file)
      }
      byDay.set(day, files)
    }
    const status = this.git("status", "--porcelain", "--untracked-files=all", "--", "*.html")
    for (const line of status.split("\n")) {
      const file = line.substring(3).replace(/^"|"$/g, "")
      if (file) {
        add(this.today(), file)
      }
    }
    // Enough history to find the days, whatever the number of commits a day.
    const log = this.git("log", "-n", "500", "--name-only", "--date=short", "--format=@%ad", "--", "*.html")
    let day = ""
    for (const line of log.split("\n")) {
      if (line.startsWith("@")) {
        day = line.substring(1)
        if (!byDay.has(day) && byDay.size >= days) {
          break
        }
      } else if (line) {
        add(day, line)
      }
    }
    const sorted = [...byDay.keys()].sort().reverse().slice(0, days)
    return new Map(sorted.map(d => [d, byDay.get(d)!]))
  }

  protected isContent(file: string): boolean {
    const {contentRoots, excluded, fragmentFile, includers} = this.options
    if (file === fragmentFile || includers.includes(file)) {
      return false
    }
    if (excluded.some(dir => file.startsWith(dir + "/"))) {
      return false
    }
    return contentRoots.some(pattern => path.matchesGlob(file, pattern))
  }

  /**
   * The title readers see: the built page's, else the source's, else the data's, else the file name.
   */
  protected title(file: string): string {
    const dateTitle = this.timeTitle(file)
    if (dateTitle) {
      return dateTitle
    }
    const titleOf = (html: string): string | undefined => {
      const title = /<title>([^<]*)<\/title>/i.exec(html)?.[1]?.trim()
        || /<!--#set var="title" value="([^"]*)"/.exec(html)?.[1]?.trim()
      return title || undefined
    }
    const outFile = path.join(this.options.outDir, file)
    let title = existsSync(outFile) ? titleOf(readFileSync(outFile, "utf-8")) : undefined
    title ??= titleOf(readFileSync(file, "utf-8"))
    if (!title) {
      const dir = path.dirname(file)
      for (const jsonName of ["people.json", "index.json", "case.json"]) {
        const jsonFile = path.join(dir, jsonName)
        if (existsSync(jsonFile)) {
          try {
            const data = JSON.parse(readFileSync(jsonFile, "utf-8"))
            title = data.title
              || [data.firstNames?.join(" "), data.lastName].filter(Boolean).join(" ")
              || undefined
          } catch {
            // Not a data file this can read: fall back on the name.
          }
          if (title) {
            break
          }
        }
      }
    }
    return title || (path.basename(file) === "index.html" ? path.basename(path.dirname(file)) : path.basename(file, ".html"))
  }

  /**
   * A chronology page (year, month or day, not a document filed under it) is named by its date, as the time pages
   * name themselves: "1652", "novembre 2026", "18 novembre 2026".
   */
  protected timeTitle(file: string): string | undefined {
    const match = /^time\/(\d)\/(\d)\/(\d)\/(\d)(?:\/(\d\d))?(?:\/(\d\d))?\/index\.html$/.exec(file)
    if (!match) {
      return undefined
    }
    const year = Number(match.slice(1, 5).join(""))
    const month = match[5] ? Number(match[5]) : undefined
    const day = match[6] ? Number(match[6]) : undefined
    if (!month) {
      return String(year)
    }
    const date = new Date(Date.UTC(year, month - 1, day ?? 1))
    return date.toLocaleDateString("fr-FR", {timeZone: "UTC", year: "numeric", month: "long", day: day ? "numeric" : undefined})
  }

  protected url(file: string): string {
    return "/" + (path.basename(file) === "index.html" ? path.dirname(file) + "/" : file)
  }

  protected render(byDay: Map<string, string[]>): string {
    const max = this.options.maxPerDay ?? 30
    const items = [...byDay].map(([day, files]) => {
      const links = files.slice(0, max).map(file => `<a href="${this.url(file)}">${this.title(file)}</a>`)
      const more = files.length > max ? ` et ${files.length - max} autres pages` : ""
      return `    <li><time data-context="none">${day}</time>&nbsp;: ${links.join(", ")}${more}.</li>`
    })
    return `<section class="updates">
  <h2>Mises à jour</h2>
  <ul>
${items.join("\n")}
  </ul>
</section>
`
  }

  /**
   * Writes the fragment, and drops the built pages that include it if it changed: the build regenerates a page only
   * when its own source is newer than its output, never because an included file changed.
   */
  protected save(fragment: string): void {
    const {fragmentFile, includers, outDir} = this.options
    const previous = existsSync(fragmentFile) ? readFileSync(fragmentFile, "utf-8") : undefined
    if (previous === fragment) {
      return
    }
    writeFileSync(fragmentFile, fragment)
    for (const includer of includers) {
      const outFile = path.join(outDir, includer)
      if (existsSync(outFile)) {
        unlinkSync(outFile)
      }
    }
  }
}
