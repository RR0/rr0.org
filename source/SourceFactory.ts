import { HtmlRR0SsgContext } from "../RR0SsgContext.js"
import { Publication, Source } from "./Source.js"
import path from "path"
import { TimeContext } from "../time/TimeContext.js"
import { FileContents } from "ssg-api"
import { JSDOM } from "jsdom"
import { AllDataService } from "../data/AllDataService.js"
import { HttpSource } from "../time/datasource/HttpSource.js"

/**
 * Create Source objects.
 */
export class SourceFactory {

  constructor(protected dataService: AllDataService, protected http: HttpSource, protected baseUrl: string,
              protected options: Intl.DateTimeFormatOptions) {
  }

  /**
   * Create a Source object from an anchor's URL.
   *
   * @param context
   * @param href The anchor's URL string.
   */
  async create(context: HtmlRR0SsgContext, href: string): Promise<Source> {
    return href.startsWith("http") ? await this.createExternal(context, href) : await this.createInternal(context, href)
  }

  /**
   * Create a Source object from a link referencing an internal page of the site.
   *
   * @param context
   * @param href
   */
  async createInternal(context: HtmlRR0SsgContext, href: string): Promise<Source> {
    if (path.dirname(href).startsWith("/")) {
      href = href.substring(1)
    }
    const hashPos = href.lastIndexOf("#")
    let hash: string
    if (hashPos > 0) {
      hash = href.substring(hashPos + 1)
      href = href.substring(0, hashPos)
    } else {
      hash = undefined
    }
    const ext = path.extname(href)
    let source: Source
    const sourceTypes = ["article", "book", "website",
      undefined   // TODO: Remove undefined when type is set in all .json files
    ]
    switch (ext) {
      case ".htm":
      case ".html":
        source = await this.fromPage(href, hash)
        break
      case ".json":
        const sources = await this.dataService.getFromDir<Source>(path.dirname(href), sourceTypes,
          [path.basename(href)])
        source = sources?.[0]
        break
      default: {
        const sources = await this.dataService.getFromDir<Source>(ext ? path.dirname(href) : href, sourceTypes,
          ["index.json", "people.json"])
        source = sources?.[0]
        if (!source) {
          source = await this.fromPage(path.join(href, "index.html"), hash)
        }
      }
    }
    const publication = source.publication
    if (publication && !publication.time) {
      publication.time = TimeContext.fromFileName(context, href)
    }
    if (hash) {
      source.index = hash
    }
    return source as Source
  }

  /**
   * Create a Source object from a link referencing a page outside the site.
   *
   * @param context
   * @param href
   */
  async createExternal(context: HtmlRR0SsgContext, href: string): Promise<Source> {
    const resOut: Partial<Response> = {}
    let title: string
    let lastModif: string
    let publisher: string
    try {
      const doc = await this.http.get(new URL(href), {}, resOut)
      href = resOut.url || href
      title = doc.querySelector("title").textContent
      lastModif = resOut.headers.get("last-modified")
    } catch (e) {
      context.error("Could not fetch source from " + href, e.message)
      title = href
    }
    publisher = resOut.headers.get("host")
    const time = lastModif ? TimeContext.fromDate(new Date(lastModif)) : context.time
    const publication: Publication = {publisher, time}
    return {
      title,
      url: href,
      events: [],
      previousSourceRefs: [],
      publication
    }
  }

  async fromPage(href: string, hash = ""): Promise<Source> {
    const filePath = path.extname(href) ? href : path.join(href, "index.html")
    const fileContents = FileContents.read(filePath)
    const doc = new JSDOM(fileContents.contents).window.document.documentElement
    const url = new URL(href, this.baseUrl)
    if (hash) {
      url.hash = hash
    }
    const values = Array.from(this.dataService.pathToData.values())
    const data = values.find(value => filePath.startsWith(value[0]?.dirName))
    let title: string
    if (data) {
      title = data[0].title
    } else {
      title = doc.querySelector("title").textContent
    }
    const publisher = doc.querySelector("meta[name='copyright']")?.getAttribute("content")
    const authors = Array.from(doc.querySelectorAll("meta[name='author']")).map(meta => meta.getAttribute("content"))
    return {
      title,
      url: url.href,
      events: [],
      previousSourceRefs: [],
      authors,
      publication: {publisher, time: undefined}
    }
  }
}
