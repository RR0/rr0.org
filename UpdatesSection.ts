import { execFileSync } from "node:child_process"
import { existsSync, readFileSync, statSync, unlinkSync, writeFileSync } from "node:fs"
import path from "node:path"

/**
 * One page that changed since the last publication.
 */
interface PageUpdate {
  file: string
  isNew: boolean
  mtimeMs: number
}

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
  netlifySiteId?: string
  netlifyToken?: string
  /**
   * How many pages each list shows at most.
   */
  maxPerList?: number
}

/**
 * Labels of the home page sections, by top-level directory.
 */
const sectionLabels: Record<string, string> = {
  time: "Chronologie",
  croyance: "Croyance",
  place: "Lieux",
  org: "Organisations",
  people: "Personnes",
  politique: "Politique",
  science: "Science",
  tech: "Technique",
  book: "Livres",
  droit: "Droit",
  udb: "Base de données"
}

/**
 * Writes the "Mises à jour" section of the home page: the pages added or modified since the site was last
 * published (the live Netlify deploy), linked.
 *
 * A page counts when git sees it changed since that publication (committed after it, or not committed yet) AND its
 * file was modified after it: a page published before being committed is not new to the readers.
 */
export class UpdatesSection {

  constructor(protected options: UpdatesSectionOptions) {
  }

  async write(): Promise<void> {
    const options = this.options
    const publishedAt = await this.lastPublication()
    if (!publishedAt) {
      if (!existsSync(options.fragmentFile)) {
        this.save("")
      }
      console.warn("UpdatesSection: last publication date unknown, home page updates left as they were")
      return
    }
    const updates = this.updatesSince(publishedAt)
    this.save(this.render(updates, publishedAt))
  }

  /**
   * When the live site was published, as Netlify says.
   */
  protected async lastPublication(): Promise<Date | undefined> {
    const {netlifySiteId, netlifyToken} = this.options
    if (!netlifySiteId || !netlifyToken) {
      return undefined
    }
    try {
      const response = await fetch(`https://api.netlify.com/api/v1/sites/${netlifySiteId}`,
        {headers: {Authorization: `Bearer ${netlifyToken}`}})
      if (!response.ok) {
        console.warn("UpdatesSection: Netlify answered", response.status)
        return undefined
      }
      const site = await response.json()
      const published = site.published_deploy?.published_at
      return published ? new Date(published) : undefined
    } catch (e) {
      console.warn("UpdatesSection: could not reach Netlify", (e as Error).message)
      return undefined
    }
  }

  protected git(...args: string[]): string {
    return execFileSync("git", args, {encoding: "utf-8", maxBuffer: 64 * 1024 * 1024})
  }

  protected updatesSince(publishedAt: Date): PageUpdate[] {
    const since = publishedAt.toISOString()
    const added = new Set<string>()
    const changed = new Set<string>()
    const log = this.git("log", `--since=${since}`, "--name-status", "--format=", "--", "*.html")
    for (const line of log.split("\n")) {
      const [status, file, renamedTo] = line.split("\t")
      if (!status) {
        continue
      }
      const name = status.startsWith("R") ? renamedTo : file
      if (status.startsWith("A") || status.startsWith("R")) {
        added.add(name)
      }
      changed.add(name)
    }
    const status = this.git("status", "--porcelain", "--untracked-files=all", "--", "*.html")
    for (const line of status.split("\n")) {
      const code = line.substring(0, 2)
      const file = line.substring(3).replace(/^"|"$/g, "")
      if (!file) {
        continue
      }
      if (code === "??" || code.includes("A")) {
        added.add(file)
      }
      changed.add(file)
    }
    const updates: PageUpdate[] = []
    for (const file of changed) {
      if (!existsSync(file) || !this.isContent(file)) {
        continue
      }
      const mtimeMs = statSync(file).mtimeMs
      if (mtimeMs <= publishedAt.getTime()) {
        continue
      }
      const isNew = added.has(file) || !existsSync(path.join(this.options.outDir, file))
      updates.push({file, isNew, mtimeMs})
    }
    return updates.sort((a, b) => b.mtimeMs - a.mtimeMs)
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

  protected section(file: string): string | undefined {
    return sectionLabels[file.split("/")[0]]
  }

  protected renderList(heading: string, updates: PageUpdate[]): string {
    if (updates.length <= 0) {
      return ""
    }
    const max = this.options.maxPerList ?? 40
    const items = updates.slice(0, max).map(update => {
      const section = this.section(update.file)
      const label = section ? ` <span class="updates-section">${section}</span>` : ""
      return `      <li><a href="${this.url(update.file)}">${this.title(update.file)}</a>${label}</li>`
    })
    const more = updates.length > max ? `\n    <p>… et ${updates.length - max} autres pages.</p>` : ""
    return `
    <h3>${heading} (${updates.length})</h3>
    <ul>
${items.join("\n")}
    </ul>${more}`
  }

  protected render(updates: PageUpdate[], publishedAt: Date): string {
    const date = publishedAt.toISOString().substring(0, 10)
    const created = updates.filter(update => update.isNew)
    const modified = updates.filter(update => !update.isNew)
    const body = updates.length > 0
      ? this.renderList("Nouvelles pages", created) + this.renderList("Pages mises à jour", modified)
      : `\n    <p>Aucune page modifiée depuis la précédente publication.</p>`
    return `<section class="updates">
  <h2>Mises à jour</h2>
  <p>Depuis la précédente publication du site, le <time data-context="none">${date}</time>&nbsp;:</p>
  <div class="updates-lists">${body}
  </div>
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
